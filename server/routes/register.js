const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const session = require("express-session");
const pool = require("../config/database");
router.post("/", async (req, res) => {
    try {
        const { username, password, email } = req.body;

        console.log("Register attempt:", { username }); // 디버깅용 로그

        const [users] = await pool.execute(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );

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




        if (!username || !password) {
            return res.status(400).json({msg:"올바른 값을 입력해주세요"});
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
