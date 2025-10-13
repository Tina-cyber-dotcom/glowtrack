import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SplashScreen from "./components/SplashScreen";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";  

function App() {
  return (
    <Router>
      <Routes>
        {/* Splash Screen */}
        <Route path="/" element={<SplashScreen />} />

        {/* Welcome Page */}
        <Route path="/welcome" element={<WelcomePage />} />

        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />  
      </Routes>
    </Router>
  );
}

export default App;
