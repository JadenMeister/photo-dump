"use client";
import { useEffect, useState } from "react";
import CanvasScene from "./Canvas/CanvasScene";
import Overlay from "../../ui/Overlay";
import Content from "../../ui/Content";
import LoginModal from "../../ui/LoginModal";
import "../../styles/SpaceBack.css"





const SpaceBackground = () => {
    const [showLogin, setShowLogin] = useState(false)

    return(
        <div className="space-container">
            <CanvasScene/>
            <Overlay/>
            <Content onExploreClick={()=> setShowLogin(true)}/>
            {showLogin && <LoginModal onClose={()=>setShowLogin(false)}/>}

        </div>
    )
}


export default SpaceBackground;