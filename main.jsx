// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { WorkoutProvider } from './context/WorkoutContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WorkoutProvider>
      <App />
    </WorkoutProvider>
  </React.StrictMode>
);



