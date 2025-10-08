import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/welcome");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900">
      {/* Glow text */}
      <h1
        className="text-6xl font-bold"
        style={{
          fontFamily: "'Pacifico', cursive",
          color: "#FFC0CB",
          textShadow: `
            0 0 5px #FF69B4,
            0 0 10px #FF69B4,
            0 0 20px #FF1493,
            0 0 30px #FF1493
          `,
        }}
      >
        Glow
      </h1>
    </div>
  );
}
