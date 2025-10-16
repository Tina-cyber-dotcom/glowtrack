import axios from 'axios';

// Base API configuration
const API_BASE_URL = 'https://wger.de/api/v2';
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Exercise API services
export const exerciseAPI = {
  // Search exercises (used in Dashboard)
  searchExercises: async (searchQuery = '', muscleFilter = '', limit = 20) => {
    try {
      let url = `/exercise/?language=2&limit=${limit}`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
      if (muscleFilter) url += `&muscle=${muscleFilter}`;
      
      const response = await api.get(url);
      return {
        success: true,
        data: response.data.results,
        total: response.data.count
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to fetch exercises',
        data: []
      };
    }
  },

  // Get exercise details by ID
  getExerciseById: async (exerciseId) => {
    try {
      const response = await api.get(`/exercise/${exerciseId}/`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to fetch exercise details'
      };
    }
  },

  // Get muscle groups
  getMuscleGroups: async () => {
    try {
      const response = await api.get('/muscle/');
      return {
        success: true,
        data: response.data.results
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch muscle groups',
        data: []
      };
    }
  }
};

// Workout tracking API (for local storage or future backend)
export const workoutAPI = {
  // Save workout log
  saveWorkoutLog: async (workoutData) => {
    try {
      // For now, store in localStorage (replace with real API later)
      const existingLogs = JSON.parse(localStorage.getItem('workoutLogs') || '[]');
      const newLog = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        exercises: workoutData.exercises,
        totalExercises: workoutData.exercises.length,
        duration: workoutData.duration || 0
      };
      
      existingLogs.push(newLog);
      localStorage.setItem('workoutLogs', JSON.stringify(existingLogs));
      
      return {
        success: true,
        data: newLog
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to save workout log'
      };
    }
  },

  // Get workout history
  getWorkoutHistory: async (limit = 10) => {
    try {
      const logs = JSON.parse(localStorage.getItem('workoutLogs') || '[]');
      const sortedLogs = logs
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);
      
      return {
        success: true,
        data: sortedLogs
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch workout history',
        data: []
      };
    }
  },

  // Get progress data for charts
  getProgressData: async (days = 30) => {
    try {
      const logs = JSON.parse(localStorage.getItem('workoutLogs') || '[]');
      const now = new Date();
      const daysAgo = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
      
      // Filter logs from the last X days
      const recentLogs = logs.filter(log => 
        new Date(log.date) >= daysAgo
      );

      // Group by date and count exercises
      const progressData = {};
      recentLogs.forEach(log => {
        const dateKey = new Date(log.date).toISOString().split('T')[0];
        if (!progressData[dateKey]) {
          progressData[dateKey] = {
            date: dateKey,
            exercises: 0,
            workouts: 0
          };
        }
        progressData[dateKey].exercises += log.totalExercises || log.exercises.length;
        progressData[dateKey].workouts += 1;
      });

      // Convert to array and sort by date
      const chartData = Object.values(progressData)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      // Fill in missing dates with 0 values
      const filledData = [];
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
        const dateKey = date.toISOString().split('T')[0];
        const existingData = chartData.find(d => d.date === dateKey);
        
        filledData.push(existingData || {
          date: dateKey,
          exercises: 0,
          workouts: 0
        });
      }

      return {
        success: true,
        data: filledData,
        summary: {
          totalWorkouts: recentLogs.length,
          totalExercises: recentLogs.reduce((sum, log) => sum + (log.totalExercises || log.exercises.length), 0),
          averagePerDay: filledData.reduce((sum, day) => sum + day.exercises, 0) / days
        }
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch progress data',
        data: []
      };
    }
  },

  // Delete workout log
  deleteWorkoutLog: async (logId) => {
    try {
      const logs = JSON.parse(localStorage.getItem('workoutLogs') || '[]');
      const updatedLogs = logs.filter(log => log.id !== logId);
      localStorage.setItem('workoutLogs', JSON.stringify(updatedLogs));
      
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to delete workout log'
      };
    }
  }
};

// Generic API utility functions
export const apiUtils = {
  // Handle loading states
  createLoadingState: () => ({
    loading: true,
    error: null,
    data: null
  }),

  // Handle success states
  createSuccessState: (data) => ({
    loading: false,
    error: null,
    data
  }),

  // Handle error states
  createErrorState: (error) => ({
    loading: false,
    error,
    data: null
  }),

  // Debounce function for search inputs
  debounce: (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }
};

export default api;