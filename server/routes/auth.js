const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");

// 회원가입
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // 이미 존재하는 사용자인지 확인
    const [users] = await pool.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (users.length > 0) {
      return res.status(400).json({ msg: "이미 존재하는 사용자입니다." });
    }

    // 비밀번호 암호화
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 새 사용자 생성
    const [result] = await pool.execute(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );

    // JWT 토큰 생성
    const payload = {
      user: {
        id: result.insertId,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// 로그인
// 로그인 라우트 부분을 수정
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // 사용자 확인
    const [users] = await pool.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (users.length === 0) {
      return res.status(400).json({ msg: "사용자가 존재하지 않습니다." });
    }

    const user = users[0];

    // 디버깅을 위한 로그
    console.log("Stored hash:", user.password);
    console.log("Provided password:", password);

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ msg: "비밀번호가 일치하지 않습니다." });
    }

    // JWT 토큰 생성
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token, username: user.username });
      }
    );
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
