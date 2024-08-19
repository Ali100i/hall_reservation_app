const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const roomsFilePath = path.join(__dirname, '../data/rooms.json');

// Utility function to read rooms from file
const readRoomsFromFile = () => {
  if (!fs.existsSync(roomsFilePath)) {
    return [];
  }
  const roomsData = fs.readFileSync(roomsFilePath);
  return JSON.parse(roomsData);
};

// Utility function to write rooms to file
const writeRoomsToFile = (rooms) => {
  fs.writeFileSync(roomsFilePath, JSON.stringify(rooms, null, 2));
};

// Utility function to generate unique ID
const generateUniqueId = () => {
  return Date.now().toString();
};

// Fetch all rooms
router.get('/', (req, res) => {
  const rooms = readRoomsFromFile();
  res.status(200).json(rooms);
});

// Add a new room
router.post('/add', (req, res) => {
  const newRoom = { id: generateUniqueId(), ...req.body };
  const rooms = readRoomsFromFile();

  // Ensure room number is unique
  if (rooms.some(room => room.roomNumber === newRoom.roomNumber)) {
    return res.status(400).json({ message: 'Room number already exists' });
  }

  rooms.push(newRoom);
  writeRoomsToFile(rooms);
  res.status(201).json({ message: 'Room added successfully' });
});

// Delete a room
router.delete('/delete/:roomNumber', (req, res) => {
  const roomNumber = req.params.roomNumber;
  let rooms = readRoomsFromFile();

  const roomIndex = rooms.findIndex(room => room.roomNumber == roomNumber);
  if (roomIndex === -1) {
    return res.status(404).json({ message: 'Room not found' });
  }

  rooms = rooms.filter(room => room.roomNumber != roomNumber);
  writeRoomsToFile(rooms);

  res.status(200).json({ message: 'Room deleted successfully' });
});

module.exports = router;
