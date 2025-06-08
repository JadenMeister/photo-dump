const express = require('express');
const router = express.Router();




router.post("/", (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            console.error("세션 삭제 실패:", err);
            res.status(500).json({ msg: "로그아웃실패" });
        } else {
            res.clearCookie('connect.sid', {
                path: '/',
                secure: false,
                sameSite: 'lax',
            });
            console.log("쿠키 제거 완료");
            res.json({ msg: "로그아웃성공" });
        }
    });
});

module.exports = router;