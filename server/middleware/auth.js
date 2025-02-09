const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");

// 토큰 검증
const verifyToken = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("인증 토큰이 필요합니다.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(400).send("토큰이 유효하지 않습니다.");
  }
};

module.exports = verifyToken;
