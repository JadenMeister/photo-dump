import React, { useState } from "react";
import Earth from "../components/Earth";
import "../styles/Background.css";
import LoginModal from "./background/ui/LoginModal";

let isCLicked = Boolean;

const Background = () => {
  const [showLogin, setShowLogin] = useState(false);

  if (isCLicked === true) {
    setShowLogin(true);
    console.log("click ");
    showLogin && <LoginModal />;
  }

  return <div className="space-background"></div>;
};

export default Background;
