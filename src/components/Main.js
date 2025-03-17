import React, { useReducer } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import BookingPage from './BookingPage';
import ConfirmedBooking from './ConfirmedBooking';

function Main() {
  const navigate = useNavigate();

  // Reducer function for available times
  const availableTimesReducer = (state, action) => {
    switch(action.type) {
      case 'UPDATE_TIMES':
        // Use the fetchAPI to get available times for the selected date
        if (window.fetchAPI) {
          return window.fetchAPI(new Date(action.payload));
        } else {
          console.warn("window.fetchAPI is not available");
          return state;
        }
      default:
        return state;
    }
  };

  // Initialize times function - fetch available times for today
  const initializeTimes = () => {
    // Create today's date and fetch available times
    if (window.fetchAPI) {
      return window.fetchAPI(new Date());
    } else {
      console.warn("window.fetchAPI is not available, using default times");
      return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
    }
  };

  // Use the reducer for available times
  const [availableTimes, dispatch] = useReducer(availableTimesReducer, null, initializeTimes);
  
  // Function to update times based on selected date
  const updateTimes = (date) => {
    dispatch({ type: 'UPDATE_TIMES', payload: date });
  };

  // Submit form function that calls the submitAPI
  const submitForm = (formData) => {
    // If API is not available, navigate to confirmation anyway
    if (typeof window.submitAPI !== 'function') {
      console.warn("window.submitAPI is not available, navigating to confirmation page anyway");
      navigate('/confirmed');
      return true;
    }
    
    // Call submitAPI with form data
    const success = window.submitAPI(formData);
    
    if (success) {
      // If successful, navigate to the confirmation page
      navigate('/confirmed');
      return true;
    }
    
    return false;
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
              submitForm={submitForm}
            />
          } 
        />
        <Route path="/confirmed" element={<ConfirmedBooking />} />
        <Route path="/about" element={<h1>About Page (Coming Soon)</h1>} />
        <Route path="/menu" element={<h1>Menu Page (Coming Soon)</h1>} />
        <Route path="/order-online" element={<h1>Order Online Page (Coming Soon)</h1>} />
        <Route path="/login" element={<h1>Login Page (Coming Soon)</h1>} />
      </Routes>
    </main>
  );
}

export default Main;