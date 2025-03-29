import React, { useState } from "react";

import "../styles/Background.css";
import LoginModal from "./background/ui/LoginModal";

const Background = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleBackgroundClick = () => {
    setShowLogin(true);
    console.log("배경 클릭됨, 모달 표시");
  };

  return (
    <div className="space-background" onClick={handleBackgroundClick}>
      {showLogin && <LoginModal />}
    </div>
  );
};

export default Background;
