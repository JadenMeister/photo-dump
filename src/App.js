import React, { useState, useEffect } from "react";
import Background from "./components/Background";
import LoginModal from "./components/LoginModal";
import "./App.css";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLogin(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      <Background />
      {showLogin && <LoginModal />}
    </div>
  );
}

export default App;
