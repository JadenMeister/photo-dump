const express = require('express');
const router = express.Router();




router.get("/", (req, res) => {
    res.session.destroy((err) => {
        if(err){
            res.status(500).json({msg: "로그아웃실패"})
    } else{
            res.json({msg: "로그아웃성공"})
        res.clearCookie('connect.sid');
            res.clearCookie('user_sid');
            res.clearCookie('sessionId');
            res.clearCookie('userId');
            res.clearCookie('roleId');
            res.clearCookie('roleName');
            res.clearCookie('permissions');
            res.clearCookie('username');

        }

    });
});

module.exports = router;