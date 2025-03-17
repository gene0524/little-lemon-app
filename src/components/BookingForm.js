import React, { useState, useEffect } from 'react';

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
  
  // Track which fields have been touched by the user
  const [touchedFields, setTouchedFields] = useState({
    date: false,
    time: false,
    guests: false,
    name: false,
    email: false,
    phone: false
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form when form data changes
  useEffect(() => {
    const errors = validateForm();
    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }, [formData]);

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

  // Mark field as touched when it loses focus
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));
  };

  // Mark field as touched when user starts interacting
  const handleFocus = (e) => {
    const { name } = e.target;
    if (!touchedFields[name]) {
      setTouchedFields(prev => ({
        ...prev,
        [name]: true
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Required field validation
    if (!formData.date) errors.date = "Date is required";
    if (!formData.time) errors.time = "Time is required";
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.phone) errors.phone = "Phone is required";
    
    // Guest count validation
    if (formData.guests < 1) errors.guests = "Must be at least 1 guest";
    if (formData.guests > 10) errors.guests = "Maximum 10 guests allowed";
    
    // Date validation - cannot be in the past
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to beginning of day for comparison
      
      if (selectedDate < today) {
        errors.date = "Cannot book for past dates";
      }
    }
    
    // Email format validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    // Phone validation - simple format check
    if (formData.phone && !/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = "Please enter a valid phone number (at least 10 digits)";
    }
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched on form submission, as we want to show all errors
    setTouchedFields({
      date: true,
      time: true,
      guests: true,
      name: true,
      email: true,
      phone: true
    });
    
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

  // Get today's date in YYYY-MM-DD format for min date attribute
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Only show error when field has been touched and has an error
  const shouldShowError = (fieldName) => {
    return touchedFields[fieldName] && formErrors[fieldName];
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form" aria-labelledby="booking-form-title" noValidate>
      <div className="form-group">
        <label htmlFor="date">Choose date:</label>
        <input 
          type="date" 
          id="date" 
          name="date" 
          value={formData.date} 
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          min={getTodayString()}
          required 
          aria-required="true"
          aria-invalid={shouldShowError('date') ? "true" : "false"}
          aria-describedby={shouldShowError('date') ? "date-error" : undefined}
        />
        {shouldShowError('date') && (
          <span className="error-message" role="alert" id="date-error">
            {formErrors.date}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="time">Choose time:</label>
        <select 
          id="time" 
          name="time" 
          value={formData.time} 
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          required
          aria-required="true"
          aria-invalid={shouldShowError('time') ? "true" : "false"}
          aria-describedby={shouldShowError('time') ? "time-error" : undefined}
        >
          <option value="">Select a time</option>
          {availableTimes.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
        {shouldShowError('time') && (
          <span className="error-message" role="alert" id="time-error">
            {formErrors.time}
          </span>
        )}
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
          onBlur={handleBlur}
          onFocus={handleFocus}
          required
          aria-required="true"
          aria-invalid={shouldShowError('guests') ? "true" : "false"}
          aria-describedby={shouldShowError('guests') ? "guests-error" : undefined}
        />
        {shouldShowError('guests') && (
          <span className="error-message" role="alert" id="guests-error">
            {formErrors.guests}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="occasion">Occasion:</label>
        <select 
          id="occasion" 
          name="occasion" 
          value={formData.occasion} 
          onChange={handleChange}
          aria-label="Select Occasion"
        >
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Business">Business</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>Contact Information</legend>
        
        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            required 
            minLength="2"
            maxLength="50"
            aria-required="true"
            aria-invalid={shouldShowError('name') ? "true" : "false"}
            aria-describedby={shouldShowError('name') ? "name-error" : undefined}
          />
          {shouldShowError('name') && (
            <span className="error-message" role="alert" id="name-error">
              {formErrors.name}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            required 
            pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
            aria-required="true"
            aria-invalid={shouldShowError('email') ? "true" : "false"}
            aria-describedby={shouldShowError('email') ? "email-error" : undefined}
          />
          {shouldShowError('email') && (
            <span className="error-message" role="alert" id="email-error">
              {formErrors.email}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            required 
            pattern="[0-9]{10,}"
            aria-required="true"
            aria-invalid={shouldShowError('phone') ? "true" : "false"}
            aria-describedby={shouldShowError('phone') ? "phone-error" : undefined}
            placeholder="e.g., 1234567890"
          />
          {shouldShowError('phone') && (
            <span className="error-message" role="alert" id="phone-error">
              {formErrors.phone}
            </span>
          )}
        </div>
      </fieldset>

      <button 
        type="submit" 
        className="reserve-button"
        aria-label="On Click"
      >
        Make Your Reservation
      </button>
      
      {submissionStatus && (
        <div className="submission-status" role="alert" aria-live="assertive">
          {submissionStatus}
        </div>
      )}
    </form>
  );
}

export default BookingForm;