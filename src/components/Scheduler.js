import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Scheduler.css';

const localizer = momentLocalizer(moment);

const Scheduler = ({ onClose }) => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/reservations');
        console.log('Fetched Reservations:', response.data); // Debug log
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  const events = reservations.map(reservation => ({
    title: `${reservation.roomNumber} - ${reservation.username || reservation.userEmail} - ${reservation.building}`,
    start: new Date(`${reservation.date}T${reservation.startTime}`),
    end: new Date(`${reservation.date}T${reservation.endTime}`),
  }));

  console.log('Events for Scheduler:', events); // Debug log

  return (
    <div className="scheduler-container">
      <button className="close-button" onClick={onClose}>Close</button>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '80vh', width: '90vw' }} // Adjust height and width
      />
    </div>
  );
};

export default Scheduler;
