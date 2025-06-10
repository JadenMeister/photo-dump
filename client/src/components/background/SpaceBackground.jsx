// src/components/SpaceBackground/SpaceBackground.jsx
"use client";
import { useState } from "react";
import CanvasScene from "./Canvas/CanvasScene";
import Overlay from "../../ui/Overlay";
import Content from "../../ui/Content";
import LoginModal from "../../ui/LoginModal";
import "../../styles/SpaceBack.css"

const SpaceBackground = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  return(
      <div className="relative h-screen overflow-hidden w-full bg-gradient-to-b from-black to-[#050520] flex items-center justify-center">
        <div className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${ // inset-0 추가
            animationComplete
                ? 'transform translate-x-[20%] md:translate-x-[15%]'
                : 'transform translate-x-0'
        }`}>
          <CanvasScene setAnimationComplete={setAnimationComplete} />
        </div>
        <Overlay />
        <div className={`relative z-20 transition-all duration-1000 delay-200 ${ 
            animationComplete
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
        }`}>
          <Content onExploreClick={()=> setShowLogin(true)}/>
        </div>

        {showLogin && <LoginModal onClose={()=>setShowLogin(false)}/>}
      </div>
  )
}

export default SpaceBackground;