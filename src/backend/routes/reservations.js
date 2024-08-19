const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const reservationsFilePath = path.join(__dirname, '../data/reservations.json');

// Utility function to read reservations from file
const readReservationsFromFile = () => {
  if (!fs.existsSync(reservationsFilePath)) {
    return [];
  }
  const reservationsData = fs.readFileSync(reservationsFilePath);
  return JSON.parse(reservationsData);
};

// Utility function to write reservations to file
const writeReservationsToFile = (reservations) => {
  fs.writeFileSync(reservationsFilePath, JSON.stringify(reservations, null, 2));
};

// Add a new reservation
router.post('/add', (req, res) => {
  const { userEmail, username, roomNumber, building, date, startTime, endTime, notes, services } = req.body;
  const newReservation = { id: Date.now().toString(), userEmail, username, roomNumber, building, date, startTime, endTime, notes, services };
  const reservations = readReservationsFromFile();

  const hasConflict = reservations.some(reservation => 
    reservation.roomNumber === newReservation.roomNumber &&
    reservation.date === newReservation.date && // Check if the date is the same
    (
      (newReservation.startTime >= reservation.startTime && newReservation.startTime < reservation.endTime) ||
      (newReservation.endTime > reservation.startTime && newReservation.endTime <= reservation.endTime) ||
      (newReservation.startTime <= reservation.startTime && newReservation.endTime >= reservation.endTime)
    )
  );

  if (hasConflict) {
    return res.status(400).json({ message: 'Time conflict with an existing reservation on the same day' });
  }

  reservations.push(newReservation);
  writeReservationsToFile(reservations);
  res.status(201).json({ message: 'Reservation added successfully' });
});

// Get all reservations
router.get('/', (req, res) => {
  const reservations = readReservationsFromFile();
  res.status(200).json(reservations);
});

// Get reservations for a specific user
router.get('/:email', (req, res) => {
  const email = req.params.email;
  const reservations = readReservationsFromFile();
  const userReservations = reservations.filter(reservation => reservation.userEmail === email);
  res.status(200).json(userReservations);
});

module.exports = router;
