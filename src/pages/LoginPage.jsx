import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFF8E7]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-80"
      >
        <h1
          className="text-3xl text-center mb-6"
          style={{ fontFamily: "'Pacifico', cursive", color: "#FFB6C1" }}
        >
          GlowTrack
        </h1>
        {error && (
          <p className="text-sm text-red-500 text-center mb-4">{error}</p>
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-6 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-2 rounded bg-pink-300 hover:bg-pink-400 transition"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
