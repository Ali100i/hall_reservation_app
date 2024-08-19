import React from 'react';
import './Reservations.css';

const Reservations = ({ reservations, onClose }) => {
  return (
    <div className="reservations-container">
      <div className="reservations-card">
        <button className="close-button" onClick={onClose}>Return</button>
        <h2>Your Reservations</h2>
        <div className="reservations-info">
          {reservations.length === 0 ? (
            <p>No reservations found</p>
          ) : (
            reservations.map((reservation, index) => (
              <div key={index} className="reservation-item">
                <p><strong>Room Number:</strong> {reservation.roomNumber}</p>
                <p><strong>Date:</strong> {reservation.date}</p>
                <p><strong>Time:</strong> {reservation.startTime} - {reservation.endTime}</p>
                <p><strong>Notes:</strong> {reservation.notes}</p>
                <p><strong>Services:</strong> {Object.entries(reservation.services)
                  .filter(([key, value]) => value)
                  .map(([key, value]) => key)
                  .join(', ')}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservations;
