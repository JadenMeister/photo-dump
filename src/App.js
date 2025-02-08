import React, { useState, useEffect } from "react";
import Background from "./components/Background";
import LoginModal from "./components/LoginModal";
import Earth from "./components/Earth";

import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLogin(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      <Background />
      <Earth />

      {showLogin && <LoginModal />}
    </div>
  );
}

export default App;
