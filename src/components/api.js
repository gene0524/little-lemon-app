// Mock API functions for Little Lemon Restaurant booking
// This file provides mock implementations of the API functions required by the booking system

// fetchAPI - Returns available booking times for a given date
window.fetchAPI = function(date) {
    // Convert date to string for easier comparison
    const dateString = date.toISOString().split('T')[0];
    
    console.log("fetchAPI called with date:", dateString);
    
    // For demonstration purposes, return different times for different days of the week
    const day = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    switch(day) {
      case 0: // Sunday
        return ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
      case 5: // Friday
      case 6: // Saturday
        return ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
      default: // Monday to Thursday
        return ['17:00', '18:00', '19:00', '20:00', '21:00'];
    }
  };
  
  // submitAPI - Accepts form data and returns true if submission is successful
  window.submitAPI = function(formData) {
    console.log("submitAPI called with formData:", formData);
    
    // Check for required fields
    if (!formData.date || !formData.time || !formData.guests || !formData.name || !formData.email || !formData.phone) {
      console.error("Missing required fields in form data");
      return false;
    }
    
    // In a real API, this would send the data to a server
    // For our mock, we'll just simulate a successful booking
    console.log("Booking successfully submitted!");
    
    // Store the booking in localStorage for persistence (optional)
    try {
      const bookings = JSON.parse(localStorage.getItem('littleLemonBookings') || '[]');
      bookings.push({
        ...formData,
        id: Date.now(), // Add a unique ID
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('littleLemonBookings', JSON.stringify(bookings));
      console.log("Booking saved to localStorage");
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
    
    return true;
  };
  
  console.log("Little Lemon API mock initialized successfully");