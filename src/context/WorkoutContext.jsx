// src/context/WorkoutContext.jsx
import React, { createContext, useState } from "react";

export const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const [workoutLog, setWorkoutLog] = useState([]);

  const addExercise = (exercise) => setWorkoutLog(prev => [...prev, exercise]);
  const removeExercise = (id) => setWorkoutLog(prev => prev.filter(e => e.id !== id));

  return (
    <WorkoutContext.Provider value={{ workoutLog, addExercise, removeExercise }}>
      {children}
    </WorkoutContext.Provider>
  );
}


