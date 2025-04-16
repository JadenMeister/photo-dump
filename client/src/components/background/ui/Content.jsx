import "../../../styles/Content.css"
import React, { useState } from "react";





const Content = ({ onExploreClick }) => {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <div className="space-content">
            <div className="space-title-container">
                <h1 className="space-title">Brighten up to Your Fragments</h1>
                <p className="space-subtitle">
                    Share your travel memories and connect with explorers around the world
                </p>


                <button className="space-cta-button" onClick={ onExploreClick} >
                    { isLogin ? "Go to your map" : "Start Explore" }
                </button>
            </div>
        </div>
    );
};

export default Content;