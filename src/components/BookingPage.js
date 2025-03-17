import React from 'react';
import BookingForm from './BookingForm';
import BookingSlot from './BookingSlot';

function BookingPage({ availableTimes, updateTimes, submitForm }) {
  return (
    <main className="booking-page">
      <section className="booking-hero" aria-labelledby="booking-title">
        <h1 id="booking-title">Reserve a Table</h1>
        <p>Complete the form below to book your dining experience at Little Lemon</p>
      </section>

      <section className="available-slots" aria-labelledby="available-slots-title">
        <h2 id="available-slots-title">Available Booking Slots</h2>
        <div className="slots-container" role="list">
          {availableTimes.map((time, index) => (
            <BookingSlot key={index} time={time} />
          ))}
        </div>
      </section>

      <section 
        className="booking-form-container" 
        aria-labelledby="booking-form-title"
      >
        <h2 id="booking-form-title" className="visually-hidden">Reservation Form</h2>
        <BookingForm 
          availableTimes={availableTimes} 
          updateTimes={updateTimes} 
          submitForm={submitForm}
        />
      </section>
    </main>
  );
}

export default BookingPage;