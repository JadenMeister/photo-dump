import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginModal from "./ui/LoginModal";
import Earth from "./components/background/Canvas/Earth";
import WorldMap from "./components/mapUtil/WorldMap";
import SpaceBackground from "./components/background/SpaceBackground";
import AdminDash from "./pages/AdminDash";
import Mypage from "./pages/Mypage";
import { AuthProvider } from "./context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "./components/ui/theme.js";


function App() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // const timer = setTimeout(() => setShowLogin(true), 1000);
    // return () => clearTimeout(timer);
  }, []);

  return (
      <ChakraProvider value={system} >
      <AuthProvider>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">

              <SpaceBackground/>
                <Earth/>

              {showLogin && <LoginModal />}
            </div>
          }
        />
        <Route path="/map" element={<WorldMap />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/admin" element={<AdminDash/>} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </Router>
      </AuthProvider>
      </ChakraProvider>
  );
}

export default App;
