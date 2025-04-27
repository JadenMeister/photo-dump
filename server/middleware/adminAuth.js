const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");

// 어드민 미들웨어

const adminAuth = (req,res, next) =>{


    if(req.session && req.session.user && req.session.user.role === "admin"){
        next(); // 역할이 관리자면 다음 핸들러로 전달
    } else{
        res.status(403).json({ msg: "관리자 권한이 필요합니다." }); // 권한 확인 후 없다면 403 에러 보내기

    }
}

module.exports = adminAuth;