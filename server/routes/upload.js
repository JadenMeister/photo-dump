const router = require("express").Router();
const pool = require("../config/database");
const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
require("dotenv").config();

// memeoryStorage를 사용하여 메모리에 파일 저장시에는 옵션 없이
const multerStorage = multer.memoryStorage();

//multer 설정
const upload = multer({multerStorage})

// AWS S3 설정
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const upload = multer ({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            const filename = `${Date.now()}_${file.originalname}`;
            cb(null, `uploads/${filename}`);
        },
    }),
})




router.post("/", upload.single("file"), async (req,res )=>{
    try{
        const {user_id, country, travel_date} = req.body;
        const photoUrl = req.file.location;

        await req.db.execute("INSERT INTO photos (user_id, country, travel_date, photo_url) VALUES (?, ?, ?, ?)",

            [user_id, country, travel_date, photoUrl]);


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