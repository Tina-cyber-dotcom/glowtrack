// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./components/SplashScreen"; 
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import WorkoutLog from "./components/WorkoutLog";
import WorkoutHistory from "./components/WorkoutHistory";
import ProgressChart from "./components/ProgressChart";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workout-log" element={<WorkoutLog />} />
        <Route path="/workout-history" element={<WorkoutHistory />} />
        <Route path="/progress-chart" element={<ProgressChart />} />
        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

