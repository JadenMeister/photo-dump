const express = require('express');
const router = express.Router();



router.get("/", (req, res) => {
    if (req.session.user) {
        res.status(200).json({
            loggedIn: true,
            user: req.session.user
        });
    } else{
        res.status(401).json({
            loggedIn: false,
            msg:"세션이 없습니다."
        })
    }
});

module.exports = router;