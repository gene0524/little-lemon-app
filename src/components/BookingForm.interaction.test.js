import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from './BookingForm';

describe('BookingForm interactions', () => {
  const availableTimes = ['17:00', '18:00', '19:00'];
  const updateTimes = jest.fn();
  
  beforeEach(() => {
    // Reset the mock before each test
    updateTimes.mockClear();
  });

  test('updateTimes function is called when date input changes', () => {
    render(<BookingForm availableTimes={availableTimes} updateTimes={updateTimes} />);
    
    // Get the date input
    const dateInput = screen.getByLabelText(/choose date/i);
    
    // Simulate a date change
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });
    
    // Check if updateTimes was called
    expect(updateTimes).toHaveBeenCalledWith('2023-01-01');
  });

  test('form fields update correctly when user interacts with them', () => {
    render(<BookingForm availableTimes={availableTimes} updateTimes={updateTimes} />);
    
    // Get form elements
    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);
    
    // Simulate user interactions
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });
    fireEvent.change(timeSelect, { target: { value: '18:00' } });
    fireEvent.change(guestsInput, { target: { value: '4' } });
    fireEvent.change(occasionSelect, { target: { value: 'Anniversary' } });
    
    // Check if the inputs have the correct values
    expect(dateInput.value).toBe('2023-01-01');
    expect(timeSelect.value).toBe('18:00');
    expect(guestsInput.value).toBe('4');
    expect(occasionSelect.value).toBe('Anniversary');
  });

  test('form submission shows confirmation message', () => {
    // Create the mock submitForm function
    const submitForm = jest.fn(() => true);
    
    // Render with the mock submitForm
    render(
      <BookingForm 
        availableTimes={availableTimes} 
        updateTimes={updateTimes} 
        submitForm={submitForm} 
      />
    );
    
    // Use a future date to avoid validation errors
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];
    
    // Fill required fields
    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    const nameInput = screen.getByLabelText(/your name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    
    fireEvent.change(dateInput, { target: { value: tomorrowString } });
    fireEvent.change(timeSelect, { target: { value: '18:00' } });
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    
    // Submit the form - use getAllByText and select first button to handle multiple instances
    const submitButtons = screen.getAllByText('Make Your Reservation');
    fireEvent.click(submitButtons[0]);
    
    // Check if submitForm was called with the correct data
    expect(submitForm).toHaveBeenCalledTimes(1);
    
    // For debugging purposes, we can check what data was passed to submitForm
    const formData = submitForm.mock.calls[0][0];
    expect(formData.date).toBe(tomorrowString);
    expect(formData.time).toBe('18:00');
    
    // Look for a submission status message
    // If submitForm returns true, there should be a success message
    const statusMessages = screen.getAllByRole('alert');
    const hasSubmissionMessage = statusMessages.some(msg => 
      msg.textContent.includes('submitted') || 
      msg.textContent.includes('success')
    );
    expect(hasSubmissionMessage).toBe(true);
  });
});