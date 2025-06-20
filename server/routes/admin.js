
const express = require("express");
const router = express.Router();



const adminAuth = require("../middleware/adminAuth");

router.get("/", (req, res) => {
       res.send("Admin Route");

});


// 어드민 유저 조회
router.get("/users", adminAuth ,async  (req, res) => {
// db 조회 같이 시간이 걸리는 작업에는 비동기작업을 사용하고 try-catch문으로 에러를 잡아준다. 코드 가독성, 에러 헨들링 용이
    try{
        const [users] = await req.db.execute("SELECT u.id, u.username, u.email, r.name AS role,  u.created_at FROM users u " +
            "LEFT JOIN roles r ON u.role_id = r.id");
        res.status(200).json(users);

        
    } catch(err){
        console.error("유저 데이터 불러오기 실패",err);
        res.status(500).json({msg: "유저 정보 불러오기 실패"});
    }


});

// 유저 삭제
router.delete("/users/:id", adminAuth, async (req, res) => {
    // 파라미터에서 id가져오기
    const {id} = req.params;
    try{
        // 삭제쿼리
        await req.db.execute("DELETE FROM users WHERE id = ?", [id]);
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
        const [uploads] = await req.db.execute("SELECT country_name, COUNT(*) as upload_count FROM photos GROUP BY country_name");
        res.status(200).json(uploads);

    } catch(err){
        console.error("업로드 통계 조회 실패", err);
        res.status(500).json({msg: "업로드 통계 조회 실패"});
    }

});

// 총업로드 카운트

router.get("/total-uploads/", adminAuth, async (req, res) => {
    try{
        const [count] = await req.db.execute("SELECT COUNT(*) as upload_count FROM photos");
        res.status(200).json(count[0]);

    }catch(err){
        console.error("업로드 카운트 조회 실패", err);
        res.status(500).json({msg: "업로드 카운트 조회 실패"});
    }
})

router.get("/each-user-photo/:id", adminAuth, async (req, res) => {
    const userId = req.params.id;
    try{
        const [photos] = await req.db.execute("SELECT p.id, p.country_name, p.travel_date, p.photo_url, u.username FROM photos p JOIN users u ON p.user_id = u.id WHERE p.user_id = ?", [userId]);
        res.json(photos);

    }catch(err){
        console.error("유저 사진 조회 실패", err);
        res.status(500).json({msg: "유저 사진 조회 실패"});
    }

})


module.exports = router;

