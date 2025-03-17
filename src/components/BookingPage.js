import React from 'react';
import BookingForm from './BookingForm';
import BookingSlot from './BookingSlot';

function BookingPage({ availableTimes, updateTimes }) {
  return (
    <main className="booking-page">
      <section className="booking-hero">
        <h1>Reserve a Table</h1>
        <p>Complete the form below to book your dining experience at Little Lemon</p>
      </section>

      <section className="available-slots">
        <h2>Available Booking Slots</h2>
        <div className="slots-container">
          {availableTimes.map((time, index) => (
            <BookingSlot key={index} time={time} />
          ))}
        </div>
      </section>

      <section className="booking-form-container">
        <BookingForm 
          availableTimes={availableTimes} 
          updateTimes={updateTimes} 
        />
      </section>
    </main>
  );
}

export default BookingPage;