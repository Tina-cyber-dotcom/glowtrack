// src/components/Button.jsx
import React from "react";

export default function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-[#C2185B]/80 text-white rounded-full hover:bg-[#A31545] transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
