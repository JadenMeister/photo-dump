const router = require("express").Router();
const pool = require("../config/database");
const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const {S3Client} = require("@aws-sdk/client-s3");
require("dotenv").config();



// AWS S3 설정 v3로 변경
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

//multer 설정
const upload = multer ({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET,
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            const filename = `${Date.now()}_${file.originalname}`;
            cb(null, `uploads/${filename}`);
        },
    }),
})




router.post("/", upload.single("photo"), async (req,res )=>{
    try{
        if(!req.file){
            return res.status(400).json({msg: "업로드 할 사진이 없습니다."});
        }

        const {user_id, country_id, travel_date} = req.body;

        const photoUrl = req.file.location;

        await req.db.execute("INSERT INTO photos (user_id, country_id, travel_date, photo_url) VALUES (?, ?, ?, ?)",

            [user_id, country_id, travel_date,  photoUrl]
        );

        res.status(200).json({ msg: "업로드 성공", photo_url: photoUrl });


    } catch (err){
        console.error("파일 업로드 실패", err);
        res.status(500).json({ msg: "파일 업로드 실패" });
    }
})

module.exports = router;