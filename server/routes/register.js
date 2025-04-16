const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const session = require("express-session");
const pool = require("../config/database");
router.post("/", async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log("Register attempt:", { username }); // 디버깅용 로그

        const [users] = await pool.execute(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );

        if (users.length > 0) {
            return res.status(400).json({ msg: "이미 존재하는 사용자입니다." });
        }

        if (!username || !password) {
            return res.status(400).json({msg:"올바른 값을 입력해주세요"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [result] = await pool.execute(
            "INSERT INTO users (username, password) VALUES (?, ?,?)",
            [username, hashedPassword,"user"]

        );
        return res.status(200).json({
            msg: "회원가입 성공",
            username
        });


        const payload = {
            user: {
                id: result.insertId
            }
        };


    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({
            success: false,
            msg: "Server error"
        });
    }
});

module.exports = router;
