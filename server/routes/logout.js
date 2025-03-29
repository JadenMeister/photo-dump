const express = require('express');
const router = express.Router();




router.get("/", (req, res) => {
    res.session.destroy((err) => {
        if(err){
            res.status(500).json({msg: "로그아웃실패"})
    } else{
        res.clearCookie('connect.sid');
        res.json({msg: "로그아웃성공"})
        }

    });
});

module.exports = router;