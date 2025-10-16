import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Button from "./Button";

export default function WorkoutLog() {
  const location = useLocation();
  const navigate = useNavigate();

  const [workoutExercises, setWorkoutExercises] = useState(
    location.state?.exercise ? [location.state.exercise] : []
  );
  const [saveState, setSaveState] = useState({
    loading: false,
    error: null,
    success: false
  });

  const handleRemoveExercise = (id) => {
    setWorkoutExercises((prev) => prev.filter((ex) => ex.id !== id));
  };

  const handleSaveWorkout = async () => {
    if (workoutExercises.length === 0) {
      setSaveState({ loading: false, error: "No exercises to save", success: false });
      return;
    }

    setSaveState({ loading: true, error: null, success: false });

    try {
      // Save to localStorage for now (later we can connect to a backend)
      const existingLogs = JSON.parse(localStorage.getItem('workoutLogs') || '[]');
      const newLog = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        exercises: workoutExercises,
        totalExercises: workoutExercises.length,
        duration: 0 // You can add duration tracking later
      };
      
      existingLogs.push(newLog);
      localStorage.setItem('workoutLogs', JSON.stringify(existingLogs));
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveState({ loading: false, error: null, success: true });
      setTimeout(() => {
        navigate("/workout-history");
      }, 1500);
    } catch (err) {
      console.error("Save workout error:", err);
      setSaveState({ loading: false, error: "Failed to save workout", success: false });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-[#FFF8E7] pb-24">
      {/* Header */}
      <h1
        style={{ fontFamily: "'Pacifico', cursive" }}
        className="text-4xl mt-6 text-[#C2185B] text-center flex items-center gap-2"
      >
        Work Log <span className="text-pink-300 text-3xl">🌸</span>
      </h1>

      {/* Instructions */}
      <p className="mt-4 text-[#C2185B] text-center px-4">
        Track your exercises here. Add new exercises from the Dashboard search.
      </p>

      {/* Workout List */}
      <div className="mt-6 w-full max-w-3xl bg-white/60 backdrop-blur-md rounded-xl p-4 shadow-lg">
        {workoutExercises.length === 0 ? (
          <p className="text-[#C2185B]/80 text-center">No exercises added yet.</p>
        ) : (
          <ul className="space-y-4">
            {workoutExercises.map((exercise) => (
              <li
                key={exercise.id}
                className="flex justify-between items-center bg-[#FFF0F5] rounded-xl p-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#C2185B] text-xl">•</span>
                  <div>
                    <p className="text-[#C2185B] font-medium">{exercise.name}</p>
                    {exercise.description && (
                      <p
                        className="text-[#C2185B]/70 text-sm"
                        dangerouslySetInnerHTML={{ __html: exercise.description }}
                      />
                    )}
                  </div>
                </div>
                <Button onClick={() => handleRemoveExercise(exercise.id)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
        
        {/* Save Workout Button */}
        {workoutExercises.length > 0 && (
          <div className="mt-6 flex flex-col items-center gap-3">
            <Button 
              onClick={handleSaveWorkout}
              disabled={saveState.loading}
              className={saveState.loading ? "opacity-50 cursor-not-allowed" : ""}
            >
              {saveState.loading ? "Saving..." : "💾 Save Workout"}
            </Button>
            
            {saveState.error && (
              <div className="text-red-600 text-sm bg-red-100 px-3 py-2 rounded-lg">
                ❌ {saveState.error}
              </div>
            )}
            
            {saveState.success && (
              <div className="text-green-600 text-sm bg-green-100 px-3 py-2 rounded-lg">
                ✅ Workout saved! Redirecting to history...
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navbar fixed at bottom */}
      <Navbar />
    </div>
  );
}
