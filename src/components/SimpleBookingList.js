import React from 'react';

function SimpleBookingList() {
  // Sample booking data - in a real app, this would come from an API or props
  const bookingData = [
    {
      id: 1,
      name: 'John Smith',
      date: '2023-03-20',
      time: '19:00',
      guests: 4,
      occasion: 'Birthday'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      date: '2023-03-21',
      time: '20:00',
      guests: 2,
      occasion: 'Anniversary'
    },
    {
      id: 3,
      name: 'Robert Johnson',
      date: '2023-03-22',
      time: '18:00',
      guests: 6,
      occasion: 'Family Dinner'
    }
  ];

  return (
    <div className="booking-list-container">
      <h3>Current Reservations</h3>
      <table className="booking-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Guests</th>
            <th>Occasion</th>
          </tr>
        </thead>
        <tbody>
          {bookingData.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.name}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>{booking.guests}</td>
              <td>{booking.occasion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SimpleBookingList;