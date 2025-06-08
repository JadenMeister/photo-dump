const router = require("express").Router();
const pool = require("../config/database");
const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const {S3Client, PutObjectCommand, DeleteObjectCommand} = require("@aws-sdk/client-s3");

const sharp = require("sharp");
require("dotenv").config();



// AWS S3 설정 v3로 변경
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const ALLOWED_MIMETYPES = ["image/jpeg", "image/png", "image/gif", "image/jpg", "image/webp"];

const upload = multer({

    // 파일업로드 취약점 방지
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 제한
    fileFilter: (req, file, cb) => {

        if (ALLOWED_MIMETYPES.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("허용되지 않는 파일 형식입니다."), false);
        }
    },
});




//업로드

router.post("/", upload.single("photo"), async (req,res,next)=>{
    const user_id = req.session.user?.id;
    let fileName =""
    if(!user_id){
        console.log("세선없음", req.session);
    }

    if (!user_id) return res.status(401).json({ msg: "로그인 필요" });
    if (!req.file) return res.status(400).json({ msg: "업로드할 사진이 없습니다." });

    try{


        const webpBuffer = await sharp(req.file.buffer).rotate().webp({ quality: 80 }).toBuffer();
        const baseName = req.file.originalname.split('.').slice(0, -1).join('.');
        fileName = `${baseName}_${Date.now()}.webp`; // 파일 이름에 타임스탬프 추가

        const uploadParams = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `uploads/${fileName}`,
            Body: webpBuffer,
            ContentType: "image/webp",
            ACL: "public-read"
        }
        await s3.send(new PutObjectCommand(uploadParams));

        const photoUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;


        const {country_name, travel_date, photo_spot} = req.body;


        await req.db.execute("INSERT INTO photos (user_id, country_name, travel_date, photo_spot, photo_url) VALUES (?, ?, ?, ?,?)",

            [user_id, country_name, travel_date, photo_spot, photoUrl]
        );


        res.status(200).json({ msg: "업로드 성공", photo_url: photoUrl });
        console.log("사진 업로드 - 세션 userId:", req.session.user?.id);
        console.log("업로드 성공", { user_id, country_name, travel_date, photoUrl });



    } catch (err){
        console.error("사진 업로드 실패", err);
        if (fileName) {
            try {
                await s3.send(new DeleteObjectCommand({
                    Bucket: process.env.AWS_S3_BUCKET,
                    Key: `uploads/${fileName}`
                }));
            } catch (s3Err) {
                console.error("S3 삭제 실패:", s3Err);
            }
        }

        return res.status(500).json({ msg: "파일 업로드 실패" }); // ✅ 한 번만 응답
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

        const [[photo]] = await req.db.execute("SELECT photo_url FROM photos WHERE id = ? AND user_id = ?", [photoId, user_id]);

        if(!photo || !photo.photo_url){
            return res.status(404).json({msg: "사진을 찾을 수 없습니다."});
        }

        //버킷에서 삭제
        const key = photo.photo_url.split(".amazonaws.com/")[1];
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