import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Background from "./components/Background";
import LoginModal from "./components/LoginModal";
import Earth from "./components/Earth";
import WorldMap from "./components/WorldMap";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLogin(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <Background />
              <Earth />
              {showLogin && <LoginModal />}
            </div>
          }
        />
        <Route path="/map" element={<WorldMap />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
