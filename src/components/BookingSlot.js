import React from 'react';

function BookingSlot({ time }) {
  return (
    <div 
      className="booking-slot" 
      role="listitem"
      aria-label={`Available booking at ${time}`}
    >
      <span className="slot-time">{time}</span>
      <span className="slot-status" aria-label="Status">Available</span>
    </div>
  );
}

export default BookingSlot;