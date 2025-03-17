import React, { useReducer, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import BookingPage from './BookingPage';

function Main() {
  // Reducer function for available times
  const availableTimesReducer = (state, action) => {
    switch(action.type) {
      case 'UPDATE_TIMES':
        // Use the fetchAPI to get available times for the selected date
        // Check if window.fetchAPI exists (to handle testing environments)
        return window.fetchAPI ? window.fetchAPI(new Date(action.payload)) : state;
      default:
        return state;
    }
  };

  // Initialize times function - fetch available times for today
  const initializeTimes = () => {
    // Create today's date and fetch available times
    // Check if window.fetchAPI exists (to handle testing environments)
    return window.fetchAPI ? window.fetchAPI(new Date()) : ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  };

  // Use the reducer for available times
  const [availableTimes, dispatch] = useReducer(availableTimesReducer, null, initializeTimes);
  
  // Function to update times based on selected date
  const updateTimes = (date) => {
    dispatch({ type: 'UPDATE_TIMES', payload: date });
  };

  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/booking" 
          element={
            <BookingPage 
              availableTimes={availableTimes} 
              updateTimes={updateTimes} 
            />
          } 
        />
        <Route path="/about" element={<h1>About Page (Coming Soon)</h1>} />
        <Route path="/menu" element={<h1>Menu Page (Coming Soon)</h1>} />
        <Route path="/order-online" element={<h1>Order Online Page (Coming Soon)</h1>} />
        <Route path="/login" element={<h1>Login Page (Coming Soon)</h1>} />
      </Routes>
    </main>
  );
}

export default Main;