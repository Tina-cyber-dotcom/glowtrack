import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Button from "./Button";

export default function WorkoutLog() {
  const location = useLocation();

  const [workoutExercises, setWorkoutExercises] = useState(
    location.state?.exercise ? [location.state.exercise] : []
  );

  const handleRemoveExercise = (id) => {
    setWorkoutExercises((prev) => prev.filter((ex) => ex.id !== id));
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
      </div>

      {/* Navbar fixed at bottom */}
      <Navbar />
    </div>
  );
}
