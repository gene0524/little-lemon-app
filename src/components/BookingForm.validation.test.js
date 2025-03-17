import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from './BookingForm';
import React from 'react';

describe('BookingForm HTML5 validation attributes', () => {
  const availableTimes = ['17:00', '18:00', '19:00'];
  const updateTimes = jest.fn();
  const submitForm = jest.fn();
  
  beforeEach(() => {
    // Reset the mocks before each test
    updateTimes.mockClear();
    submitForm.mockClear();
    render(<BookingForm availableTimes={availableTimes} updateTimes={updateTimes} submitForm={submitForm} />);
  });

  test('date input has required and min attributes', () => {
    const dateInput = screen.getByLabelText(/choose date/i);
    expect(dateInput).toHaveAttribute('required');
    expect(dateInput).toHaveAttribute('min');
    
    // Verify min date is today or earlier (can't test exact value as it changes daily)
    const minDate = new Date(dateInput.getAttribute('min'));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    expect(minDate.getTime()).toBeLessThanOrEqual(today.getTime() + 86400000); // Allow 1 day difference for timezone issues
  });

  test('time select has required attribute', () => {
    const timeSelect = screen.getByLabelText(/choose time/i);
    expect(timeSelect).toHaveAttribute('required');
  });

  test('guests input has required, min and max attributes', () => {
    const guestsInput = screen.getByLabelText(/number of guests/i);
    expect(guestsInput).toHaveAttribute('required');
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '10');
  });

  test('name input has required and length attributes', () => {
    const nameInput = screen.getByLabelText(/your name/i);
    expect(nameInput).toHaveAttribute('required');
    expect(nameInput).toHaveAttribute('minLength', '2');
    expect(nameInput).toHaveAttribute('maxLength', '50');
  });

  test('email input has required and pattern attributes', () => {
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('pattern');
  });

  test('phone input has required and pattern attributes', () => {
    const phoneInput = screen.getByLabelText(/phone/i);
    expect(phoneInput).toHaveAttribute('required');
    expect(phoneInput).toHaveAttribute('pattern');
  });
});

describe('BookingForm JavaScript validation', () => {
  const availableTimes = ['17:00', '18:00', '19:00'];
  const updateTimes = jest.fn();
  const submitForm = jest.fn().mockReturnValue(true);
  
  beforeEach(() => {
    // Reset the mocks and render the component
    jest.clearAllMocks();
    render(<BookingForm availableTimes={availableTimes} updateTimes={updateTimes} submitForm={submitForm} />);
  });

  test('displays no errors when form is initially rendered', () => {
    // No error messages should be visible on initial render
    const errorMessages = screen.queryAllByRole('alert');
    expect(errorMessages.length).toBe(0);
  });

  test('displays error for empty required field after interaction', () => {
    // Get the name input field
    const nameInput = screen.getByLabelText(/your name/i);
    
    // Focus and blur without entering a value
    fireEvent.focus(nameInput);
    fireEvent.blur(nameInput);
    
    // Error message should now be visible
    const errorMessage = screen.getByText(/name is required/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('does not display error when valid input is provided', () => {
    // Get the name input field
    const nameInput = screen.getByLabelText(/your name/i);
    
    // Focus, enter valid value, and blur
    fireEvent.focus(nameInput);
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.blur(nameInput);
    
    // No error message should be visible
    const errorMessage = screen.queryByText(/name is required/i);
    expect(errorMessage).not.toBeInTheDocument();
  });

  test('validates email format correctly', () => {
    // Get the email input field
    const emailInput = screen.getByLabelText(/email/i);
    
    // Test invalid email
    fireEvent.focus(emailInput);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    
    // Error message for invalid email should be visible
    let errorMessage = screen.getByText(/valid email address/i);
    expect(errorMessage).toBeInTheDocument();
    
    // Test valid email
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.blur(emailInput);
    
    // Error message should disappear
    errorMessage = screen.queryByText(/valid email address/i);
    expect(errorMessage).not.toBeInTheDocument();
  });

  test('validates phone number format correctly', () => {
    // Get the phone input field
    const phoneInput = screen.getByLabelText(/phone/i);
    
    // Test invalid phone (too short)
    fireEvent.focus(phoneInput);
    fireEvent.change(phoneInput, { target: { value: '123456' } });
    fireEvent.blur(phoneInput);
    
    // Error message for invalid phone should be visible
    let errorMessage = screen.getByText(/valid phone number/i);
    expect(errorMessage).toBeInTheDocument();
    
    // Test valid phone
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.blur(phoneInput);
    
    // Error message should disappear
    errorMessage = screen.queryByText(/valid phone number/i);
    expect(errorMessage).not.toBeInTheDocument();
  });

  test('validates past dates are not allowed', () => {
    // Get the date input field
    const dateInput = screen.getByLabelText(/choose date/i);
    
    // Set a past date (one year ago)
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 1);
    const pastDateString = pastDate.toISOString().split('T')[0];
    
    // Enter past date
    fireEvent.focus(dateInput);
    fireEvent.change(dateInput, { target: { value: pastDateString } });
    fireEvent.blur(dateInput);
    
    // Error message for past date should be visible
    const errorMessage = screen.getByText(/Cannot book for past dates/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('validates future dates are allowed', () => {
    // Get the date input field
    const dateInput = screen.getByLabelText(/choose date/i);
    
    // Set a future date (tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];
    
    // Enter future date
    fireEvent.focus(dateInput);
    fireEvent.change(dateInput, { target: { value: tomorrowString } });
    fireEvent.blur(dateInput);
    
    // No error message should be visible
    const errorMessage = screen.queryByText(/Cannot book for past dates/i);
    expect(errorMessage).not.toBeInTheDocument();
  });

  test('validates guest count limits', () => {
    // Get the guests input field
    const guestsInput = screen.getByLabelText(/number of guests/i);
    
    // Test too many guests
    fireEvent.focus(guestsInput);
    fireEvent.change(guestsInput, { target: { value: '11' } });
    fireEvent.blur(guestsInput);
    
    // Error message for too many guests should be visible
    let errorMessage = screen.getByText(/Maximum 10 guests/i);
    expect(errorMessage).toBeInTheDocument();
    
    // Test too few guests
    fireEvent.change(guestsInput, { target: { value: '0' } });
    fireEvent.blur(guestsInput);
    
    // Error message for too few guests should be visible
    errorMessage = screen.getByText(/at least 1 guest/i);
    expect(errorMessage).toBeInTheDocument();
    
    // Test valid guest count
    fireEvent.change(guestsInput, { target: { value: '5' } });
    fireEvent.blur(guestsInput);
    
    // No error message about guest count limits should be visible
    const maxGuestsError = screen.queryByText(/Maximum 10 guests/i);
    const minGuestsError = screen.queryByText(/at least 1 guest/i);
    expect(maxGuestsError).not.toBeInTheDocument();
    expect(minGuestsError).not.toBeInTheDocument();
  });

  test('shows all errors when attempting to submit invalid form', () => {
    // Attempt to submit the empty form
    const submitButton = screen.getByText(/Make your reservation/i);
    fireEvent.click(submitButton);
    
    // Multiple error messages should now be visible
    const errorMessages = screen.getAllByRole('alert');
    
    // We expect at least 5 errors (date, time, name, email, phone)
    expect(errorMessages.length).toBeGreaterThanOrEqual(5);
  });

  test('allows submission of valid form', () => {
    // Fill all required fields with valid data
    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const nameInput = screen.getByLabelText(/your name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    
    // Set future date (tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];
    
    // Fill all inputs with valid values
    fireEvent.change(dateInput, { target: { value: tomorrowString } });
    fireEvent.change(timeSelect, { target: { value: '18:00' } });
    fireEvent.change(guestsInput, { target: { value: '4' } });
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    
    // Submit the form
    const submitButton = screen.getByText(/Make your reservation/i);
    fireEvent.click(submitButton);
    
    // Verify submitForm was called with the correct data
    expect(submitForm).toHaveBeenCalledTimes(1);
    
    // Get the actual data passed to submitForm
    const formData = submitForm.mock.calls[0][0];
    
    // Check each field separately, handling the type conversion for guests
    expect(formData.date).toBe(tomorrowString);
    expect(formData.time).toBe('18:00');
    expect(parseInt(formData.guests, 10)).toBe(4); // Convert string to number before comparing
    expect(formData.occasion).toBe('Birthday');
    expect(formData.name).toBe('John Doe');
    expect(formData.email).toBe('valid@example.com');
    expect(formData.phone).toBe('1234567890');
    
    // When submitForm is successful, the component might show a submission status
    // So instead of checking for zero alerts, check that no validation error messages are present
    const dateError = screen.queryByText(/date is required/i);
    const timeError = screen.queryByText(/time is required/i);
    const nameError = screen.queryByText(/name is required/i);
    const emailError = screen.queryByText(/email is required/i);
    const phoneError = screen.queryByText(/phone is required/i);
    
    expect(dateError).not.toBeInTheDocument();
    expect(timeError).not.toBeInTheDocument();
    expect(nameError).not.toBeInTheDocument();
    expect(emailError).not.toBeInTheDocument();
    expect(phoneError).not.toBeInTheDocument();
  });
});