import React from 'react';
import BookingForm from './BookingForm';

function BookingPage() {
  return (
    <main className="booking-page">
      <section className="booking-hero">
        <h1>Reserve a Table</h1>
        <p>Complete the form below to book your dining experience at Little Lemon</p>
      </section>

      <section className="booking-form-container">
        <BookingForm />
      </section>
    </main>
  );
}

export default BookingPage;