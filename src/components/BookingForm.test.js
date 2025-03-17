import { render, screen } from "@testing-library/react";
import BookingForm from './BookingForm';

test('Renders the BookingForm heading and labels', () => {
    // Mock props that BookingForm expects
    const availableTimes = ['17:00', '18:00', '19:00'];
    const updateTimes = jest.fn();
    
    render(<BookingForm availableTimes={availableTimes} updateTimes={updateTimes} />);
    
    // Test for static text (labels in the form)
    const dateLabel = screen.getByText("Choose date:");
    const timeLabel = screen.getByText("Choose time:");
    const guestsLabel = screen.getByText("Number of guests:");
    const occasionLabel = screen.getByText("Occasion:");
    
    // Verify elements are in the document
    expect(dateLabel).toBeInTheDocument();
    expect(timeLabel).toBeInTheDocument();
    expect(guestsLabel).toBeInTheDocument();
    expect(occasionLabel).toBeInTheDocument();
    
    // Test for the submit button
    const submitButton = screen.getByText("Make Your Reservation");
    expect(submitButton).toBeInTheDocument();
});