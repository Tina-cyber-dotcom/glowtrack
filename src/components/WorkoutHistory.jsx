import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Button from "./Button";

export default function WorkoutHistory() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = () => {
    try {
      const saved = localStorage.getItem('workoutLogs');
      const data = saved ? JSON.parse(saved) : [];
      setWorkouts(data);
    } catch (error) {
      console.error('Error loading workouts:', error);
      setWorkouts([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteWorkout = (workoutId) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        const updated = workouts.filter(w => w.id !== workoutId);
        localStorage.setItem('workoutLogs', JSON.stringify(updated));
        setWorkouts(updated);
      } catch (error) {
        console.error('Error deleting workout:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center">
        <p className="text-[#C2185B] text-xl">Loading workouts... 💪</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8E7] pb-24">
      {/* Header */}
      <div className="p-4">
        <h1 className="text-3xl font-bold text-[#C2185B] text-center mb-6">
          Workout History 🌸
        </h1>
        
        {/* Content */}
        {workouts.length === 0 ? (
          <div className="bg-white/60 rounded-xl p-6 text-center">
            <p className="text-[#C2185B] text-lg mb-2">No workouts yet! 💪</p>
            <p className="text-[#C2185B]/70">Save a workout to see it here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {workouts.map((workout) => (
              <div key={workout.id} className="bg-white/60 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-[#C2185B] font-semibold">
                    {new Date(workout.date).toDateString()}
                  </h3>
                  <Button 
                    onClick={() => deleteWorkout(workout.id)}
                    className="bg-red-200 text-red-700 px-2 py-1 text-sm"
                  >
                    Delete
                  </Button>
                </div>
                
                <p className="text-[#C2185B]/80 text-sm mb-2">
                  {workout.exercises?.length || 0} exercises
                </p>
                
                {workout.exercises?.map((exercise, idx) => (
                  <div key={idx} className="bg-[#FFF0F5] rounded p-2 mb-1">
                    <span className="text-[#C2185B] font-medium">
                      {exercise.name || `Exercise ${idx + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Navbar />
    </div>
  );
}
