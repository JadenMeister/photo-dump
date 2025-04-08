const router = require("express").Router();
const pool = require("../config/database");
const express = require("express");
const multer = require("multer");




router.get("/", async(req,res )=>{
    try{
        const {country_name, photoBase64} = req.query
        const userId = req.session.user.id

        await pool.execute(
            "INSERT INTO country (country_name, user_id, photoBase64) VALUES (?, ?, ?)",
            [country_name, userId, photoBase64]
        );
        res.status(200).json({msg: "업로드 성공"})


    }catch(error){
        console.error("에러", error)
        res.status(500).json({msg: "서버 오류"})
    }
})
