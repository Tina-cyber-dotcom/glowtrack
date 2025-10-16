import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address ✨");
      return;
    }
    if (password.length < 6) {
      setError("Password should be at least 6 characters 🌸");
      return;
    }
    navigate("/dashboard");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#FFF8E7" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-80 flex flex-col gap-4"
      >
        <h1
          className="text-3xl text-center"
          style={{ fontFamily: "'Pacifico', cursive", color: "#FFB6C1" }}
        >
          GlowTrack
        </h1>

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" className="w-full">
          Log In
        </Button>
      </form>
    </div>
  );
}
