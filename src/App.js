import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginModal from "./components/background/ui/LoginModal";

import WorldMap from "./components/WorldMap";
import SpaceBackground from "./components/background/SpaceBackground";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // const timer = setTimeout(() => setShowLogin(true), 1000);
    // return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <SpaceBackground/>

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
