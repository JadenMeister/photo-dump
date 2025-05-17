const router = require("express").Router();
const pool = require("../config/database");
const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const {S3Client} = require("@aws-sdk/client-s3");
const {DeleteObjectCommand} = require("@aws-sdk/client-s3");
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




    // 파일업로드 취약점 방지 로직
    limits: {fileSize: 5* 1024 * 1024}, // 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg", "image/webp"];
        if(allowedTypes.includes(file.mimetype)){
            cb(null, true);
        } else{
            cb(new Error("허용되지 않는 파일 형식입니다."), false);
        }
    }
})




//업로드

router.post("/", upload.single("photo"), async (req,res,next)=>{
    const user_id = req.session.user?.id;
    console.log("받은파일", req.file);
    console.log("받은바디", req.body);
    if(!user_id){
        console.log("세선없음", req.session);
    }

    try{
        if(!req.file){
            return res.status(400).json({msg: "업로드 할 사진이 없습니다."});
        }

        const {country_name, travel_date} = req.body;

        const photoUrl = req.file.location;

        await req.db.execute("INSERT INTO photos (user_id, country_name, travel_date, photo_url) VALUES (?, ?, ?, ?)",

            [user_id, country_name, travel_date,  photoUrl]
        );


        res.status(200).json({ msg: "업로드 성공", photo_url: photoUrl });
        console.log("사진 업로드 - 세션 userId:", req.session.user?.id);
        console.log("업로드 성공", { user_id, country_name, travel_date, photoUrl });



    } catch (err){
        console.error("파일 업로드 실패", err);
        res.status(500).json({ msg: "파일 업로드 실패" });
    }
})



// 삭제

router.delete("/delete-photos", async (req,res,next)=>{
    const user_id = req.session.user?.id;
    const photoId = req.body.id;

    if(!user_id){
        return res.status(401).json({msg: "로그인 필요"});
    }

    if(!photoId){
        return res.status(400).json({msg: "삭제할 사진 ID가 필요합니다."});
    }

    try{
        //버킷에서 삭제
        const key = photo_url.split(".amazonaws.com/")[1];
        const s3Delete= new DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: key
        })

        await s3.send(s3Delete);

        await req.db.execute("DELETE FROM photos WHERE id = ? AND user_id = ?", [photoId, user_id]);
        res.status(200).json({msg: "사진 삭제 성공"});
    }catch(err){
        console.error("사진 삭제 실패", err);
        res.status(500).json({msg: "사진 삭제 실패"});
    }

})
module.exports = router;