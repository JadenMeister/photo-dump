const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");

// 모든 라우트에 CORS 헤더 추가
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// 로그인 라우트에서 응답 형식 수정
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Login attempt:", { username }); // 디버깅용 로그

    const [users] = await pool.execute(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (users.length === 0) {
      return res.status(400).json({ msg: "사용자가 존재하지 않습니다." });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "비밀번호가 일치하지 않습니다." });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        // 명시적으로 상태 코드와 헤더 설정
        res
          .status(200)
          .header("Access-Control-Allow-Origin", "http://localhost:3000")
          .header("Access-Control-Allow-Credentials", "true")
          .json({
            success: true,
            token,
            username: user.username
          });
      }
    );
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      msg: "Server error"
    });
  }
});

// 회원가입 라우트도 비슷하게 수정
router.post("/register", async (req, res) => {
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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await pool.execute(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );

    const payload = {
      user: {
        id: result.insertId
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        // 명시적으로 상태 코드와 헤더 설정
        res
          .status(200)
          .header("Access-Control-Allow-Origin", "http://localhost:3000")
          .header("Access-Control-Allow-Credentials", "true")
          .json({
            success: true,
            token,
            username
          });
      }
    );
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({
      success: false,
      msg: "Server error"
    });
  }
});

module.exports = router;
