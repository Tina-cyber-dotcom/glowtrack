// src/utils/storage.js
const KEY = "glowtrack_workouts_v1";

export function loadWorkouts() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveWorkouts(arr) {
  try {
    localStorage.setItem(KEY, JSON.stringify(arr));
  } catch {}
}

export function addWorkout(workout) {
  const all = loadWorkouts();
  all.unshift(workout); // newest first
  saveWorkouts(all);
  return all;
}
