const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const session = require("express-session");
const pool = require("../config/database");
const nodemailer = require("nodemailer");




router.post("/send-verfiyCode", async (req, res) => {
    const {email} = req.body;
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    req.session.emailVerification = {
        email,
        code,
        timestamp: Date.now()
    };

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Photodump Email Verification Code",
        text: `회원님의 이메일 인증번호는 ${code} 입니다. 본 코드는 5분간 유효합니다.`,
    };

    try{
        await transporter.sendMail(mailOptions);
        console.log("전송된 이메일:", email);
        res.status(200).json({ msg: "코드전송", code });

    } catch (err){
        console.error("Email sending error:", err);
        return res.status(500).json({msg: "이메일 전송 실패"});
    }
})


router.post("/verify-code", async (req, res) => {
    const {email, code} = req.body;
    const data = req.session.emailVerification;
    const TTL = 5 * 60 * 1000;
    if (!data || data.email !== email || data.code !== code) {
        return res.status(400).json({ msg: "이메일 인증 요청 없음" });
    }

    if( Date.now() - data.timestamp > TTL) {
        return res.status(400).json({ msg: "인증 코드가 만료되었습니다." });
    }

    if(data.code !== code) {
        return res.status(400).json({ msg: "인증 코드가 일치하지 않습니다." });
    }

    req.session.emailVerification = true; // 인증 성공 시 세션에 true 저장
    delete req.session.emailVerification;
    return res.status(200).json({ msg: "인증 성공" });
})



router.post("/", async (req, res) => {
    try {
        const { username, password, email } = req.body;

        console.log("Register attempt:", { username }); // 디버깅용 로그

        const [users] = await pool.execute(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );
        if (!username || !password) {
            return res.status(400).json({msg:"올바른 값을 입력해주세요"});
        }
        if(!req.session.emailVerification) {
            return res.status(400).json({ msg: "이메일 인증이 필요합니다." });
        }

        if (users.length > 0) {
            return res.status(400).json({ msg: "이미 존재하는 사용자입니다." });
        }



        const [emails] = await pool.execute(
            "SELECT * FROM users WHERE email = ?",
            [emails]
        )
        if (email.length > 0) {
            return res.status(400).json({ msg: "이미 존재하는 이메일입니다." });
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // roles 테이블에서 "user" role_id 가져오기
        const [roleRows] = await pool.execute(
            "SELECT id FROM roles WHERE name = 'user'"
        );
        const userRoleId = roleRows[0].id;

        // users 테이블에 저장
        await pool.execute(
            "INSERT INTO users (username, email, password, role_id) VALUES (?, ?, ?, ?)",
            [username, email,  hashedPassword, userRoleId]
        );

        delete req.session.emailVerification; // 인증 성공 후 세션에서 제거

        return res.status(200).json({
            msg: "회원가입 성공",
            username,
            email
        });



    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({
            success: false,
            msg: "Server error"
        });
    }
});





module.exports = router;
