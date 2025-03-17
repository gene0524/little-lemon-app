import React from 'react';

function BookingSlot({ time }) {
  return (
    <div className="booking-slot">
      <span className="slot-time">{time}</span>
      <span className="slot-status">Available</span>
    </div>
  );
}

export default BookingSlot;