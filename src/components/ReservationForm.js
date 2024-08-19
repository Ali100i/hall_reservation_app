import React, { useState, useEffect } from 'react';
import './ReservationForm.css';

const ReservationForm = ({ room, onSubmit, onReturn, user }) => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [notes, setNotes] = useState('');
  const [services, setServices] = useState({
    coffee: false,
    snacks: false,
    projector: false,
  });

  useEffect(() => {
    console.log('Current User:', user);
  }, [user]);

  const handleServiceChange = (event) => {
    const { name, checked } = event.target;
    setServices((prevServices) => ({
      ...prevServices,
      [name]: checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reservation = {
      userEmail: user.email,
      username: user.name,
      roomNumber: room.roomNumber,
      building: room.building,
      date,
      startTime,
      endTime,
      notes,
      services,
    };
    onSubmit(reservation);
  };

  return (
    <div className="reservation-form-container">
      <form className="reservation-form" onSubmit={handleSubmit}>
        <h2>Reserve Room {room.roomNumber}</h2>
        <div className="room-details">
          <p><strong>Building:</strong> {room.building}</p>
          <p><strong>Floor:</strong> {room.floor}</p>
          <p><strong>Capacity:</strong> {room.capacity}</p>
          <p><strong>Administration:</strong> {room.responsibleAdmin}</p>
        </div>
        <div>
          <label>Date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="time-inputs">
          <div>
            <label>Starting Time: </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Ending Time: </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label>Notes: </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div>
          <label>Hospitality Services: </label>
          <div>
            <label>
              <input
                type="checkbox"
                name="coffee"
                checked={services.coffee}
                onChange={handleServiceChange}
              />
              Coffee
            </label>
            <label>
              <input
                type="checkbox"
                name="snacks"
                checked={services.snacks}
                onChange={handleServiceChange}
              />
              Snacks
            </label>
            <label>
              <input
                type="checkbox"
                name="projector"
                checked={services.projector}
                onChange={handleServiceChange}
              />
              Projector
            </label>
          </div>
        </div>
        <button type="submit">Reserve</button>
        <button className="return-button" onClick={onReturn}>Return</button>
      </form>
    </div>
  );
};

export default ReservationForm;
