import React, { useState } from 'react';

function BookingForm({ availableTimes, updateTimes }) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 1,
    occasion: 'Birthday',
    name: '',
    email: '',
    phone: ''
  });
  
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // If date changes, update available times
    if (name === 'date') {
      updateTimes(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Show confirmation message instead of using alert
    setConfirmationMessage('Booking submitted! You will receive a confirmation shortly.');
    
    // Here you would typically send the data to a server
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form" aria-label="Reservation Form">
      <div className="form-group">
        <label htmlFor="date">Choose date:</label>
        <input 
          type="date" 
          id="date" 
          name="date" 
          value={formData.date} 
          onChange={handleChange}
          required 
        />
      </div>

      <div className="form-group">
        <label htmlFor="time">Choose time:</label>
        <select 
          id="time" 
          name="time" 
          value={formData.time} 
          onChange={handleChange}
          required
        >
          <option value="">Select a time</option>
          {availableTimes.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="guests">Number of guests:</label>
        <input 
          type="number" 
          id="guests" 
          name="guests" 
          min="1" 
          max="10" 
          value={formData.guests} 
          onChange={handleChange}
          required 
        />
      </div>

      <div className="form-group">
        <label htmlFor="occasion">Occasion:</label>
        <select 
          id="occasion" 
          name="occasion" 
          value={formData.occasion} 
          onChange={handleChange}
        >
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="name">Your Name:</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange}
          required 
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange}
          required 
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input 
          type="tel" 
          id="phone" 
          name="phone" 
          value={formData.phone} 
          onChange={handleChange}
          required 
        />
      </div>

      <button type="submit" className="reserve-button">Make Your Reservation</button>
      
      {confirmationMessage && (
        <div className="confirmation-message" role="alert">
          {confirmationMessage}
        </div>
      )}
    </form>
  );
}

export default BookingForm;