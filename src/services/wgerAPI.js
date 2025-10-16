import axios from 'axios';

// Create axios instance for WGER API
const wgerAPI = axios.create({
  baseURL: 'https://wger.de/api/v2',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request logging
wgerAPI.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response/error handling
wgerAPI.interceptors.response.use(
  (response) => {
    console.log(`✅ API Success: ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Exercise API functions
export const exerciseAPI = {
  // Search exercises with better error handling
  searchExercises: async (searchQuery = '', muscleFilter = '') => {
    try {
      let url = `/exerciseinfo/?language=2&limit=20`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
      if (muscleFilter) url += `&muscle=${muscleFilter}`;
      
      const response = await wgerAPI.get(url);
      
      // Transform the data to include exercise names from translations
      const exercises = response.data.results?.map(exercise => {
        const translation = exercise.translations?.[0]; // Get first translation (should be English)
        return {
          id: exercise.id,
          name: translation?.name || 'Unnamed Exercise',
          description: translation?.description || '',
          category: exercise.category?.name || '',
          muscles: exercise.muscles || [],
          equipment: exercise.equipment || [],
          ...exercise // Include all original data
        };
      }) || [];
      
      return {
        success: true,
        data: exercises,
        count: response.data.count || 0
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to search exercises',
        data: []
      };
    }
  },

  // Get exercise details by ID
  getExerciseDetails: async (exerciseId) => {
    try {
      const response = await wgerAPI.get(`/exerciseinfo/${exerciseId}/`);
      
      // Transform the data to include exercise name from translations
      const exercise = response.data;
      const translation = exercise.translations?.[0];
      const transformedExercise = {
        id: exercise.id,
        name: translation?.name || 'Unnamed Exercise',
        description: translation?.description || '',
        category: exercise.category?.name || '',
        muscles: exercise.muscles || [],
        equipment: exercise.equipment || [],
        ...exercise // Include all original data
      };
      
      return {
        success: true,
        data: transformedExercise
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Failed to get exercise details',
        data: null
      };
    }
  }
};

export default wgerAPI;