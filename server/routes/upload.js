const router = require("express").Router();
const pool = require("../config/database");
const express = require("express");
const multer = require("multer");


const multerStorage = multer.diskStorage({
    destination:(req, file, callback) =>{
        callback(null, "uploads/"); // 파일폴더를 지정함  callback으로 multer에 전달
    },
    filename:(req, file, callback) =>{
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9); // 파일이름을 고유하게 만들기 위해 현재시간과 랜덤숫자를 조합
        callback(null, file.fieldname + "-" + uniqueSuffix + ".jpg"); // 파일이름을 지정함
    }
});

//multer 설정
const upload = multer({storage})




router.get("/", upload.single("file"), (req,res )=>{
    try{
        if(!req.file){
            return res.status(400).json({msg: "업로드 할 사진이 없습니다."});
        } else {
            res.status(200).json({msg:"업로드 성공"});
        }
        
    } catch (err){
        console.error("파일 업로드 실패", err);
        res.status(500).json({ msg: "파일 업로드 실패" });
    }
})

module.exports = router;