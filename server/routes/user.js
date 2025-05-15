const express = require('express');
const router = express.Router();
const pool = require('../config/database');



router.get("/upload-count", async (req, res) => {
  const userId = req.session?.user?.id;
  console.log("userId", userId);
  if (!userId) {
    return res.status(401).json({ msg: "로그인 필요" });
  }

  try{
    const [rows] = await req.db.execute(
      `SELECT COUNT(*) AS upload_count
       FROM photos
       WHERE user_id = ?`,
      [userId]
    );

    res.status(200).json(rows[0]);

  } catch(err){
    console.error("업로드 카운트 조회 오류:", err);
    return res.status(500).json({ msg: "서버 오류" });
  }
})

// 업로드 나라 통계 가져오기
router.get("/upload-country", async (req, res)=>{
  const userId = req.session?.user?.id;
  if(!userId){
    return res.status(401).json({msg: "로그인 필요"});
  }

  try{
    const [rows] = await req.db.execute(
      `SELECT country_name, COUNT(*) AS upload_count
       FROM photos
       WHERE user_id = ?
       GROUP BY country_name`,
      [userId]
    );

    res.status(200).json(rows);

  }catch(err){
    res.status(500).json({msg: "서버 오류"});
  }
})


// 업로드 사진 가져오기
router.get ("/upload-photos", async (req, res)=>{
  const userId = req.session?.user?.id;
  if(!userId){
    return res.status(401).json({msg: "로그인 필요"});
  }

  try{
    const [rows] = await req.db.execute(
      `SELECT *
       FROM photos
       WHERE user_id = ?`,
      [userId]
    );

    res.status(200).json(rows);

  }catch(err){
    res.status(500).json({msg: "서버 오류"});
  }
})




module.exports = router;