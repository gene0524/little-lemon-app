import React, { useState } from 'react';

function BookingPage() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 1,
    occasion: 'Birthday',
    name: '',
    email: '',
    phone: ''
  });

  const availableTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to a server
    alert('Booking submitted! You will receive a confirmation shortly.');
  };

  return (
    <main className="booking-page">
      <section className="booking-hero">
        <h1>Reserve a Table</h1>
        <p>Complete the form below to book your dining experience at Little Lemon</p>
      </section>

      <section className="booking-form-container">
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label htmlFor="date">Date:</label>
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
            <label htmlFor="time">Time:</label>
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
              <option value="Business">Business</option>
              <option value="Other">Other</option>
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
        </form>
      </section>
    </main>
  );
}

export default BookingPage;