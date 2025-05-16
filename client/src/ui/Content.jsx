import "../styles/Content.css"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";





const Content = ({ onExploreClick }) => {
    const navigate = useNavigate();
    const { isLogin } = useAuth();

    const handleToMap = () => {

            navigate("/map");

    };

    return (
        <div className="space-content">
            <div className="space-title-container">
                <h1 className="space-title">Brighten up to Your Fragments</h1>
                <p className="space-subtitle">
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