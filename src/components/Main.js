import React, { useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import BookingPage from './BookingPage';

// Define the reducer function for available times
const availableTimesReducer = (state, action) => {
  switch(action.type) {
    case 'UPDATE_TIMES':
      // For now, return the same times regardless of date as specified in instructions
      return state;
    default:
      return state;
  }
};

// Initialize times function
const initializeTimes = () => {
  // Return initial available times
  return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
};

function Main() {
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