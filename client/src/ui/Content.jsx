import "../styles/Content.css"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";





const Content = ({ onExploreClick }) => {
    const navigate = useNavigate();
    const { isLogin } = useAuth();

    const handleToMap = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/session`, {
                method: "GET",
                credentials: "include"
            });

            if (res.ok) {
                navigate("/map");
            } else {
                alert("세션이 만료되어 다시 로그인해주세요.");
                window.location.reload();
            }
        } catch (err) {
            console.error("세션 확인 실패:", err);
            alert("오류가 발생했습니다.");
        }
    };


    return (
        <div className="items-center flex h-[100%] left-0 absolute top-0 w-full z-3 ">
            <div className="text-white left-[10%] max-w-[40%] relative">
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-snug mb-4 text-white"
                  style={{textShadow: "0 0 10px #0064ffb3"}}
                >
                    Brighten up to Your Fragments
                </h1>
                <p className="text-[#e8e8e8] text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6"
                style={{textShadow:"0 0 10px #0c7df5b3"}}>
                    Share your travel memories and connect with explorers around the world
                </p>


                <button className="space-cta-button" onClick={ isLogin ? handleToMap : onExploreClick} >
                    { isLogin ? "Go to your map" : "Start Explore" }
                </button>

            </div>
        </div>
    );
};

export default Content;