import React, { useState, useEffect } from "react";

export default function WorkoutHistory() {
  const [history, setHistory] = useState([
    {
      id: 1,
      date: "2025-10-15",
      exercises: [
        { name: "Bodyweight Squat", sets: 3, reps: 12 },
        { name: "Push-ups", sets: 3, reps: 10 },
      ],
    },
    {
      id: 2,
      date: "2025-10-14",
      exercises: [{ name: "Pull-ups", sets: 3, reps: 8 }],
    },
  ]);

  const darkText = "#C2185B";

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-[#FFF8E7]">
      {/* Header */}
      <h1
        style={{ fontFamily: "'Pacifico', cursive" }}
        className="text-4xl mt-6 text-[#C2185B] text-center flex items-center gap-2"
      >
        Workout History <span className="text-pink-300 text-3xl">🌸</span>
      </h1>

      {/* History List */}
      <div className="mt-6 w-full max-w-3xl flex flex-col gap-6">
        {history.length === 0 ? (
          <p className="text-[#C2185B]/80 text-center">No workouts logged yet.</p>
        ) : (
          history.map((session) => (
            <div
              key={session.id}
              className="bg-white/60 backdrop-blur-md rounded-xl p-4 shadow-lg"
            >
              <h2 className="text-[#C2185B] font-semibold mb-2">{session.date}</h2>
              <ul className="space-y-2">
                {session.exercises.map((ex, idx) => (
                  <li key={idx} className="flex justify-between items-center bg-[#FFF0F5] rounded-xl p-2">
                    <span className="text-[#C2185B]">• {ex.name}</span>
                    <span className="text-[#C2185B]/70 text-sm">
                      {ex.sets} sets × {ex.reps} reps
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
