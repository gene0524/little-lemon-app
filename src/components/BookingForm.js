import React, { useState } from 'react';

function BookingForm({ availableTimes, updateTimes, submitForm }) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 1,
    occasion: 'Birthday',
    name: '',
    email: '',
    phone: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState('');

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

  const validateForm = () => {
    const errors = {};
    
    if (!formData.date) errors.date = "Date is required";
    if (!formData.time) errors.time = "Time is required";
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.phone) errors.phone = "Phone is required";
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // For debugging
    console.log("Form submission attempted");
    console.log("Form data:", formData);
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
      setFormErrors(errors);
      setSubmissionStatus('Validation failed - see errors above');
      return;
    }
    
    // Clear any previous errors
    setFormErrors({});
    
    try {
      // Check if submitForm is a function
      if (typeof submitForm !== 'function') {
        console.error("submitForm is not a function:", submitForm);
        setSubmissionStatus('Error: submitForm is not a function');
        return;
      }
      
      // Call the submitForm function passed via props
      console.log("Calling submitForm with data:", formData);
      const result = submitForm(formData);
      console.log("submitForm result:", result);
      
      // If we're still here (not redirected), show status
      setSubmissionStatus('Form submitted successfully, but no redirect occurred');
    } catch (error) {
      console.error("Error during form submission:", error);
      setSubmissionStatus(`Error: ${error.message}`);
    }
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
          aria-invalid={formErrors.date ? "true" : "false"}
        />
        {formErrors.date && <span className="error-message">{formErrors.date}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="time">Choose time:</label>
        <select 
          id="time" 
          name="time" 
          value={formData.time} 
          onChange={handleChange}
          required
          aria-invalid={formErrors.time ? "true" : "false"}
        >
          <option value="">Select a time</option>
          {availableTimes.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
        {formErrors.time && <span className="error-message">{formErrors.time}</span>}
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
          aria-invalid={formErrors.name ? "true" : "false"}
        />
        {formErrors.name && <span className="error-message">{formErrors.name}</span>}
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
          aria-invalid={formErrors.email ? "true" : "false"}
        />
        {formErrors.email && <span className="error-message">{formErrors.email}</span>}
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
          aria-invalid={formErrors.phone ? "true" : "false"}
        />
        {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
      </div>

      <button type="submit" className="reserve-button">Make Your Reservation</button>
      
      {submissionStatus && (
        <div className="submission-status" role="alert">
          {submissionStatus}
        </div>
      )}
    </form>
  );
}

export default BookingForm;