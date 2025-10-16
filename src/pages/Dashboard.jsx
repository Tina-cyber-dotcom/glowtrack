import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  // Fetch exercises from WGER API
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
      // Fetch full details via Endpoint 2
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
                <button
                  onClick={() => handleAddToWorkoutLog(exercise)}
                  className="text-white bg-[#C2185B] px-3 py-1 rounded-full text-sm hover:bg-[#A31545]"
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* START GLOWING Dropdown */}
      <div className="w-full max-w-3xl mb-6 flex flex-col items-center mt-6">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-[#F7B9C6] text-white px-6 py-3 rounded-full shadow-lg text-lg font-semibold"
        >
          START GLOWING
        </button>

        {showDropdown && (
          <div className="mt-4 flex flex-col w-64 bg-white/90 backdrop-blur-md rounded-xl shadow-lg">
            <button
              onClick={() => navigate("/workout-log")}
              className="px-4 py-3 hover:bg-[#FFF0F5] text-center text-[#C2185B] font-medium rounded-t-xl"
            >
              📝 Workout Log
            </button>
            <button
              onClick={() => navigate("/workout-history")}
              className="px-4 py-3 hover:bg-[#FFF0F5] text-center text-[#C2185B] font-medium"
            >
              📚 Workout History
            </button>
            <button
              onClick={() => navigate("/progress-chart")}
              className="px-4 py-3 hover:bg-[#FFF0F5] text-center text-[#C2185B] font-medium rounded-b-xl"
            >
              📈 My Progress 🙂
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
