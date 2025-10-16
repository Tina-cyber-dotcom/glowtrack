import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { exerciseAPI } from "../services/wgerAPI";
import Button from "../components/Button"; // Correct path to your Button component

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [muscleFilter, setMuscleFilter] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  // New state for better UX
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

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
    // Clear results if no search criteria
    if (!searchQuery && !muscleFilter) {
      setSearchResults([]);
      setSearchError(null);
      setIsSearching(false);
      return;
    }

    const fetchExercises = async () => {
      setIsSearching(true);
      setSearchError(null);
      
      // Call our API service
      const result = await exerciseAPI.searchExercises(searchQuery, muscleFilter);
      
      if (result.success) {
        setSearchResults(result.data);
        setSearchError(null);
      } else {
        setSearchResults([]);
        setSearchError(result.error);
      }
      
      setIsSearching(false);
    };

    // Add small delay to avoid too many API calls while typing
    const timeoutId = setTimeout(fetchExercises, 300);
    
    // Cleanup timeout if user keeps typing
    return () => clearTimeout(timeoutId);
  }, [searchQuery, muscleFilter]);

  const handleAddToWorkoutLog = async (exercise) => {
    // Get detailed exercise info before navigating
    const result = await exerciseAPI.getExerciseDetails(exercise.id);
    
    
    if (result.success) {
      // Navigate with detailed exercise data
      navigate("/workout-log", { state: { exercise: result.data } });
    } else {
      // If details fetch fails, still navigate with basic exercise info
      console.warn("Could not fetch exercise details, using basic info");
      navigate("/workout-log", { state: { exercise } });
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

        {/* Search Results - Loading State */}
        {isSearching && (
          <div className="mt-2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-4 text-center">
            <div className="text-[#C2185B]">🔍 Searching exercises...</div>
          </div>
        )}
        
        {/* Search Results - Error State */}
        {searchError && !isSearching && (
          <div className="mt-2 bg-red-100 rounded-xl shadow-lg p-4 text-center">
            <div className="text-red-600">❌ {searchError}</div>
          </div>
        )}
        
        {/* Search Results - Success State */}
        {searchResults.length > 0 && !isSearching && !searchError && (
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
        
        {/* Search Results - No Results State */}
        {(searchQuery || muscleFilter) && !isSearching && searchResults.length === 0 && !searchError && (
          <div className="mt-2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-4 text-center">
            <div className="text-[#C2185B]/70">
              No exercises found for "{searchQuery}"
              {muscleFilter && " in selected muscle group"}
            </div>
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
