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
        <div className="absolute h-screen overflow-hidden w-full bg-gradient-to-b from-black to-[#050520]">
            <CanvasScene/>
            <Overlay/>
            <Content onExploreClick={()=> setShowLogin(true)}/>
            {showLogin && <LoginModal onClose={()=>setShowLogin(false)}/>}

        </div>
    )
}


export default SpaceBackground;