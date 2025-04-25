const router = require("express").Router();
const pool = require("../config/database");
const express = require("express");
const multer = require("multer");

// memeoryStorage를 사용하여 메모리에 파일 저장시에는 옵션 없이
const multerStorage = multer.memoryStorage();

//multer 설정
const upload = multer({multerStorage})




router.post("/", upload.single("file"), (req,res )=>{
    try{
        if(!req.file){
            return res.status(400).json({msg: "업로드 할 사진이 없습니다."});
        } else {
            const base64 = req.file.buffer.toString("base64");
            res.status(200).json({msg:"업로드 성공"});
        }
        
    } catch (err){
        console.error("파일 업로드 실패", err);
        res.status(500).json({ msg: "파일 업로드 실패" });
    }
})

module.exports = router;