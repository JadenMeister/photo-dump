import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Mypage = () => {

    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState("");
    const Navigate = useNavigate() ;

    useEffect(() => {
       const usernameStorage = sessionStorage.getItem("username");

       if(usernameStorage){
           setUsername(usernameStorage);
              setIsLogin(true);

       } else{
              alert("잘못된 접근입니다.");
              Navigate("/");
       }
    }, []);

    return(
        <div className="mypage-container">
            <h2>{username}님의 마이페이지 </h2>
            <p>업로드한 추억을 확인해보세요</p>
            <button className="logoutBtn" onClick={() => {
                sessionStorage.removeItem("username");
                window.location.href = "/";
            }}>Logout</button>
        </div>
    )
};

export default Mypage;
