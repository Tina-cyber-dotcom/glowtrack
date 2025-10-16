import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"; // make sure the path is correct

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-6"
      style={{ backgroundColor: "#FFF8E7" }}
    >
      <h1
        className="text-5xl font-bold mb-2"
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
        Grow Glowing
      </h1>

      <p
        className="text-lg mb-6 text-center max-w-md"
        style={{
          color: "#FFB6C1",
          fontStyle: "italic",
        }}
      >
        Grow with intention, glow without limits.
      </p>

      <Button onClick={() => navigate("/login")} className="px-8 py-3 text-gray-900">
        Get Glowing
      </Button>
    </div>
  );
}
