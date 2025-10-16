import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-3xl mx-auto flex justify-around items-center p-4 bg-white/40 backdrop-blur-md rounded-3xl shadow-lg mt-6">
      <Button onClick={() => navigate("/dashboard")} className="flex items-center gap-2">
        🏠 Home
      </Button>

      <Button onClick={() => navigate("/workout-log")} className="flex items-center gap-2">
        📝 Work Log
      </Button>

      <Button onClick={() => navigate("/workout-history")} className="flex items-center gap-2">
        📚 History
      </Button>

      <Button onClick={() => navigate("/progress-chart")} className="flex items-center gap-2">
        📈 Progress
      </Button>
    </div>
  );
}
