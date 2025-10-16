import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button"; // Correct path to your Button component

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [muscleFilter, setMuscleFilter] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const quotes = [
    { text: "Small steps every day are still steps.", author: "Maya L." },
    { text: "Consistency beats intensity.", author: "—" },
    { text: "You don’t have to be great to start, but you have to start to be great.", author: "Zig Z." },
    { text: "Progress, not perfection.", author: "—" },
    { text: "One healthy choice can change your whole day.", author: "—" },
  ];
  const dayIndex = Math.floor(Date.now() / 86400000) % quotes.length;
  const [quoteIndex, setQuoteIndex] = useState(dayIndex);

  const darkText = "#C2185B";

  useEffect(() => {
    const timer = setInterval(() => {
      const idx = Math.floor(Date.now() / 86400000) % quotes.length;
      setQuoteIndex(idx);
    }, 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!searchQuery && !muscleFilter) {
      setSearchResults([]);
      return;
    }

    const fetchExercises = async () => {
      try {
        let url = `https://wger.de/api/v2/exercise/?language=2`;
        if (searchQuery) url += `&search=${searchQuery}`;
        if (muscleFilter) url += `&muscle=${muscleFilter}`;
        const res = await axios.get(url);
        setSearchResults(res.data.results);
      } catch (err) {
        console.error("Error fetching exercises:", err);
      }
    };

    fetchExercises();
  }, [searchQuery, muscleFilter]);

  const handleAddToWorkoutLog = async (exercise) => {
    try {
      const res = await axios.get(`https://wger.de/api/v2/exerciseinfo/${exercise.id}/`);
      const exerciseDetails = res.data;
      navigate("/workout-log", { state: { exercise: exerciseDetails } });
    } catch (err) {
      console.error("Error fetching exercise details:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-[#FFF8E7]">
      {/* Quote */}
      <h1
        style={{ fontFamily: "'Pacifico', cursive" }}
        className="text-4xl mt-6 text-[#C2185B] text-center"
      >
        Welcome back, Babe
      </h1>

      <div className="mt-6 text-center px-4">
        <p className="text-[#C2185B] italic text-lg">“{quotes[quoteIndex].text}”</p>
        <p className="mt-2 text-[#C2185B] text-sm">— {quotes[quoteIndex].author}</p>
        <div className="mt-2 text-[#C2185B] text-xs font-semibold">Grow Glowing</div>
      </div>

      {/* Search + Muscle Filter */}
      <div className="mt-6 w-full max-w-3xl flex flex-col gap-2">
        <input
          type="text"
          placeholder="Search exercises..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
        />

        <select
          value={muscleFilter}
          onChange={(e) => setMuscleFilter(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
        >
          <option value="">Filter by Muscle Group</option>
          <option value="1">Biceps</option>
          <option value="2">Triceps</option>
          <option value="3">Shoulders</option>
          <option value="4">Chest</option>
          <option value="5">Back</option>
          <option value="6">Legs</option>
        </select>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg max-h-64 overflow-y-auto">
            {searchResults.map((exercise) => (
              <div
                key={exercise.id}
                className="flex justify-between items-center px-4 py-2 border-b border-gray-200 hover:bg-[#FFF0F5]"
              >
                <span className="text-[#C2185B]">{exercise.name}</span>
                <Button onClick={() => handleAddToWorkoutLog(exercise)}>+ Add</Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* START GLOWING Dropdown */}
      <div className="w-full max-w-3xl mb-6 flex flex-col items-center mt-6">
        <Button onClick={() => setShowDropdown(!showDropdown)}>
          START GLOWING
        </Button>

        {showDropdown && (
          <div className="mt-4 flex flex-col w-64 bg-white/90 backdrop-blur-md rounded-xl shadow-lg">
            <Button
              className="rounded-t-xl"
              onClick={() => navigate("/workout-log")}
            >
              📝 Workout Log
            </Button>
            <Button onClick={() => navigate("/workout-history")}>
              📚 Workout History
            </Button>
            <Button
              className="rounded-b-xl"
              onClick={() => navigate("/progress-chart")}
            >
              📈 My Progress 🙂
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
