export const checkLoginStatus = (req, res, next) => {
  if(req.session.user) {
    next(); // 로그인 상태인 경우 다음 미들웨어로 이동
  } else{
    res.status(401).json({ msg: "로그인 필요" }); // 로그인 필요

  }
}