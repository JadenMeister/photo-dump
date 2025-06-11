import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/Content.css";

const Content = ({ onExploreClick, animationComplete }) => {
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

                console.warn("세션이 만료되어 다시 로그인해주세요.");
                window.location.reload();
            }
        } catch (err) {
            console.error("세션 확인 실패:", err);
            console.error("오류가 발생했습니다.");
        }
    };

    return (

        <div className="relative top-0 left-0 w-full h-full z-70 flexmd:items-startmax-md:items-center max-md:justify-center">

            <div className="relative text-whitemd:left-[10%] md:max-w-[40%] md:pt-16max-md:max-w-[85%] max-md:text-center max-md:px-4">
                <h1

                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 text-white"
                    style={{textShadow: "0 0 10px #0064ffb3"}}
                >
                    Project Photodump

                </h1>
                <p className="text-[#e8e8e8] text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6" style={{textShadow:"0 0 10px #0c7df5b3"}}>
                    Save the Memories Fragments
                </p>
                <p className="text-[#e8e8e8] text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6" style={{textShadow:"0 0 10px #0c7df5b3"}}>
                    Share your travel memories and share your own spots
                </p>

                <button

                    className="space-cta-button"
                    onClick={ isLogin ? handleToMap : onExploreClick}
                >
                    { isLogin ? "Go to your map" : "Start Explore" }
                </button>
            </div>
        </div>
    );
};

export default Content;
