import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState("");
  const fullText = "Glow";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = 3000 / fullText.length; 
    let intervalId = null;
    let finishTimer = null;

    intervalId = setInterval(() => {
      setDisplayText(fullText.slice(0, currentIndex + 1));
      currentIndex++;

      if (currentIndex >= fullText.length) {
        clearInterval(intervalId);
        finishTimer = setTimeout(() => {
          const splashDiv = document.getElementById("splash-screen");
          if (splashDiv) {
            splashDiv.style.transition = "opacity 0.5s ease-out";
            splashDiv.style.opacity = 0;
          }
          setTimeout(() => navigate("/welcome"), 500); 
        }, 500);
      }
    }, typingInterval);

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (finishTimer) clearTimeout(finishTimer);
    };
  }, [navigate]);

  return (
    <div
      id="splash-screen"
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#FFF8E7" }}  
    >
      <h1
        className="text-6xl"
        style={{
          fontFamily: "'Pacifico', cursive",
          color: "#FFC0CB",
          letterSpacing: "2px",
        }}
      >
        {displayText}
      </h1>
    </div>
  );
}
