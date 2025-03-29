const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const pool = require("../config/database");







// 로그인 라우트에서 응답 형식 수정
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Login attempt:", { username, password }); // 디버깅용 로그

    const [users] = await pool.execute(
      "SELECT * FROM users WHERE username = ?",

      [username]

    );

    console.log('db', users)


    if (users.length === 0) {
      return res.status(400).json({ msg: "사용자가 존재하지 않습니다." });
    }

    const user = users[0];
    console.log("입력된 username:", username);
    console.log("입력된 password:", password);
    console.log("조회된 user 객체:", user);
    console.log("user.password:", user?.password);

    if (!password || !user || !user.password) {
      console.error(" 비교할 password가 없음", { password, user });
      return res.status(500).json({ msg: "서버 내부 오류: 비밀번호 없음" });
    }

    const isMatch = await bcrypt.compare(password, user.password);



    if (!isMatch) {
      return res.status(400).json({ msg: "비밀번호가 일치하지 않습니다." });
    }



    req.session.user = {
      id: user.id,
        username: user.username
    };

    res.status(200).json({
      success: true,
      username: user.username
    });



  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      msg: "Server error"
    });
  }
});

module.exports = router;