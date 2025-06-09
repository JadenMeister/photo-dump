const express = require("express");
const axios = require("axios");
const pool = require("../config/database");
const router = express.Router();

router.get("/kakao/callback", async (req, res) => {
  const { code } = req.query;

  try {
    // 1. 카카오 토큰 요청
    const kakaoTokenUrl = "https://kauth.kakao.com/oauth/token";
    const params = {
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_CLIENT_ID,
      redirect_uri: process.env.KAKAO_REDIRECT_URI,
      code,
    };
    const tokenRes = await axios.post(kakaoTokenUrl, null, { params });
    const { access_token } = tokenRes.data;

    // 2. 카카오 사용자 정보 요청
    const userRes = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const kakaoAccount = userRes.data.kakao_account;
    const email = kakaoAccount.email;
    const nickname = kakaoAccount.profile.nickname;

    // 3. DB에서 이메일로 유저 검색
    const [users] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);

    let userId, username, roleId, roleName;

    if (users.length === 0) {
      // 신규 유저: 회원가입
      const [roleRows] = await pool.execute(
          "SELECT id, name FROM roles WHERE name = 'user'"
      );
      roleId = roleRows[0].id;
      roleName = roleRows[0].name;

      const [result] = await pool.execute(
          "INSERT INTO users (username, email, role_id, provider) VALUES (?, ?, ?, ?)",
          [nickname, email, roleId, "kakao"]
      );
      userId = result.insertId;
      username = nickname;

      console.log("[가입] 신규 카카오 유저 등록:", { userId, username, email, roleName });
    } else {
      // 기존 유저
      const user = users[0];
      userId = user.id;
      username = user.username;
      roleId = user.role_id;

      // roles 테이블에서 name 가져오기
      const [roleRows] = await pool.execute(
          "SELECT name FROM roles WHERE id = ?",
          [roleId]
      );
      roleName = roleRows[0]?.name || "user";

      console.log("[로그인] 기존 유저:", { userId, username, email, roleName });
    }

    // 4. 권한(permission) 조회
    const [permissionRows] = await pool.execute(
        `SELECT p.action
       FROM role_permissions rp
       JOIN permissions p ON rp.permission_id = p.id
       WHERE rp.role_id = ?`,
        [roleId]
    );
    const permissions = permissionRows.map(row => row.action);

    // 5. 세션에 user 정보 저장 (role: 이름으로)
    req.session.user = {
      id: userId,
      username,
      email,
      role: roleName,
      permissions,
    };

    // 6. 정상 리다이렉트
    res.redirect(`${process.env.TEST_CLIENT_BASE_URL}/map`);
  } catch (err) {
    console.error("카카오 로그인 에러:", err?.response?.data || err);
    res.status(500).json({ msg: "카카오 로그인 실패" });
  }
});

module.exports = router;