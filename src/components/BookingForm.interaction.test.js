import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from './BookingForm';

describe('BookingForm interactions', () => {
  const availableTimes = ['17:00', '18:00', '19:00'];
  const updateTimes = jest.fn();
  
  beforeEach(() => {
    // Reset the mock before each test
    updateTimes.mockClear();
    render(<BookingForm availableTimes={availableTimes} updateTimes={updateTimes} />);
  });

  test('updateTimes function is called when date input changes', () => {
    // Get the date input
    const dateInput = screen.getByLabelText(/choose date/i);
    
    // Simulate a date change
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });
    
    // Check if updateTimes was called
    expect(updateTimes).toHaveBeenCalledWith('2023-01-01');
  });

  test('form fields update correctly when user interacts with them', () => {
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
    // Fill required fields
    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    const nameInput = screen.getByLabelText(/your name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const phoneInput = screen.getByLabelText(/phone/i);
    
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });
    fireEvent.change(timeSelect, { target: { value: '18:00' } });
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    
    // Submit the form
    const submitButton = screen.getByText('Make Your Reservation');
    fireEvent.click(submitButton);
    
    // Check for confirmation message
    const confirmationMessage = screen.getByRole('alert');
    expect(confirmationMessage).toBeInTheDocument();
    expect(confirmationMessage.textContent).toContain('Booking submitted');
  });
});