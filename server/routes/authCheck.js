const express = require('express');


const router = express.Router();

router.get('/', async(req,res) =>{
    if(req.session.user){
        res.json({
            success: true,
            user: {
                id: req.session.user.id,
                username: req.session.user.username,
                role: req.session.user.role,
                permissions: req.session.user.permissions || [],
            },
        });
    } else{
        res.status(401).json({ success: false, msg: "로그인 필요" });
    }

})

module.exports = router;



