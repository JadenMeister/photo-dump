const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const pool = require("../config/database");



// 로그인 라우트에서 응답 형식 수정
router.post("/", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    console.log("Login attempt:", { username, password }); // 디버깅용 로그

    const [users] = await pool.execute(
      "SELECT * FROM users WHERE username = ?",

      [username]

    );

    if(users.length === 0){

        return res.status(400).json({ msg: "사용자를 찾을 수 없습니다." });
    }

    const user = users[0];
    console.log("user 전체:", user);
    console.log("user.role:", user?.role);


    if (!password || !user || !user.password) {
      console.error(" 비교할 password가 없음", { password, user });
      return res.status(500).json({ msg: "서버 내부 오류: 비밀번호 없음" });
    }

    // 비밀번호 비교
    const isMatch = await bcrypt.compare(password, user.password);



    if (!isMatch) {
      return res.status(400).json({ msg: "비밀번호가 일치하지 않습니다." });
    }

    // 역할 가져오기

    const [roles] = await pool.execute(
        `SELECT * FROM roles WHERE id =?`,
        [user.role.id]
    )
    const roleName = roles[0].name;

    // 권한 가져오기

    const [permissionRows] = await pool.execute(
        `SELECT p.action
         FROM role_permissions rp
         JOIN permissions p ON rp.permission_id = p.id
         WHERE rp.role_id = ?`,
        [user.role.id]
    );
    const permissions = permissionRows.map(row => row.action);




    // role을 받아와서 role에 따라 다른 페이지로 이동하게 함
    req.session.user = {
      id: user.id,
      username: user.username,
      role: roleName,
      permissions: permissions,
    };

    console.log("최종",user.role)

    // role을 받아와서 role에 따라 다른 페이지로 이동하게 함2
    res.status(200).json({
      success: true,
      username: user.username,
      role: user.role
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