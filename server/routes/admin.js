
const express = require("express");
const router = express.Router();



const adminAuth = require("../middleware/adminAuth");


// 어드민 유저 조회
router.get("/api/admin/users", async  (req, res) => {
// db 조회 같이 시간이 걸리는 작업에는 비동기작업을 사용하고 try-catch문으로 에러를 잡아준다. 코드 가독성, 에러 헨들링 용이
    try{
        const users = await req.db.query("SELECT id, username, role, created_at FROM users");
        res.status(200).json(users);
        
    } catch(err){
        console.error("유저 데이터 불러오기 실패",err);
        res.status(500).json({msg: "유저 정보 불러오기 실패"});
    }


});

// 유저 삭제
router.delete("/api/admin/users/:id", adminAuth, async (req, res) => {
    // 파라미터에서 id가져오기
    const {id} = req.params;
    try{
        // 삭제쿼리
        await req.db.query("DELETE FROM users WHERE id = ?", [id]);
        res.status(200).json({"msg": "유저 삭제 성공"});

    } catch(err){
        console.error(`${req.params.id}유저 삭제 실패`, err);
        res.status(500).json({msg: "유저 삭제 실패"});

    }


});


// 업로드 통계
router.get("/country-uploads", adminAuth, async (req, res) => {
    try{
        // db에서 가져온 업로드 통계 데이터
        const uploads = await req.db.query("SELECT country_name, COUNT(*) as upload_count FROM country GROUP BY country_name");
        res.json(uploads);
        res.status(200).json(uploads);

    } catch(err){
        console.error("업로드 통계 조회 실패", err);
        res.status(500).json({msg: "업로드 통계 조회 실패"});
    }

});


