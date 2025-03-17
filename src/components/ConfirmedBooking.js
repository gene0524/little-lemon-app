import React from 'react';
import { Link } from 'react-router-dom';

function ConfirmedBooking() {
  return (
    <main className="confirmed-booking">
      <section className="confirmation-container">
        <div className="confirmation-card">
          <h1>Booking Confirmed!</h1>
          <div className="confirmation-check">
            <span>✓</span>
          </div>
          <p>Thank you for your reservation at Little Lemon.</p>
          <p>We look forward to serving you. You will receive a confirmation email with your booking details.</p>
          <Link to="/" className="home-button">Return to Home</Link>
        </div>
      </section>
    </main>
  );
}

export default ConfirmedBooking;