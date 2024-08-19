import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import RoomList from './components/RoomList';
import ReservationForm from './components/ReservationForm';
import Login from './components/Login';
import RegisterForm from './components/RegisterForm';
import Profile from './components/Profile';
import Reservations from './components/Reservations';
import AddRoomForm from './components/AddRoomForm';
import Scheduler from './components/Scheduler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import './components/CalendarButton.css';

const App = () => {
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showReservations, setShowReservations] = useState(false);
  const [showAddRoomForm, setShowAddRoomForm] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedCity, setSelectedCity] = useState('Dammam'); // Default city

  useEffect(() => {
    fetchRooms();

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsLoggedIn(true);
      setSelectedCity(user.city); // Set default city to user's city
      fetchReservations(user.email); // Fetch reservations for the current user
    }
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const fetchReservations = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/reservations/${email}`);
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const handleReserve = (room) => {
    setSelectedRoom(room);
  };

  const handleDeleteRoom = async (roomNumber) => {
    try {
      await axios.delete(`http://localhost:5001/api/rooms/delete/${roomNumber}`);
      setRooms(rooms.filter(room => room.roomNumber !== roomNumber));
      alert('Room deleted successfully');
    } catch (error) {
      console.error('Error deleting room:', error);
      alert('Error deleting room');
    }
  };

  const handleSubmitReservation = async (reservation) => {
    try {
      await axios.post('http://localhost:5001/api/reservations/add', reservation);
      setReservations([...reservations, reservation]);
      alert(`Room ${reservation.roomNumber} reserved on ${reservation.date} from ${reservation.startTime} to ${reservation.endTime} with notes: "${reservation.notes}"`);
      setSelectedRoom(null);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        console.error('Error adding reservation:', error);
        alert('Error adding reservation');
      }
    }
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setSelectedCity(user.city); // Set default city to user's city
    localStorage.setItem('user', JSON.stringify(user));
    fetchReservations(user.email); // Fetch reservations for the current user
  };

  const handleRegister = () => {
    setShowRegisterForm(true);
  };

  const handleRegisterSubmit = async (userData) => {
    try {
      await axios.post('http://localhost:5001/api/register', userData);
      alert('User registered successfully');
      setShowRegisterForm(false);
    } catch (error) {
      console.error('Error registering:', error);
      alert('Error registering user');
    }
  };

  const handleCloseRegisterForm = () => {
    setShowRegisterForm(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  const handleReservationsClick = () => {
    setShowReservations(true);
  };

  const handleCloseReservations = () => {
    setShowReservations(false);
  };

  const handleReturn = () => {
    setSelectedRoom(null);
  };

  const handleAddRoom = async (newRoom) => {
    try {
      const response = await axios.post('http://localhost:5001/api/rooms/add', newRoom, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setRooms([...rooms, response.data]);
      setShowAddRoomForm(false); // Close the Add Room form after successful addition
    } catch (error) {
      console.error('Error adding room:', error);
      alert('Error adding room');
    }
  };

  const handleCloseAddRoomForm = () => {
    setShowAddRoomForm(false);
  };

  const handleSchedulerClick = () => {
    setShowScheduler(true);
  };

  const handleCloseScheduler = () => {
    setShowScheduler(false);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  const filteredRooms = rooms.filter(room => room.city === selectedCity);

  return (
    <div className="App">
      <Header
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        user={currentUser}
        onProfileClick={handleProfileClick}
        onReservationsClick={handleReservationsClick}
        onCityChange={handleCityChange}
        selectedCity={selectedCity}
        onAddRoomClick={() => {
          setShowAddRoomForm(true);
          setSelectedRoom(null); // Ensure selectedRoom is null when adding a new room
        }}
      />
      <main>
        {!isLoggedIn ? (
          <>
            <Login onLogin={handleLogin} onRegister={handleRegister} />
            {showRegisterForm && <RegisterForm onSubmit={handleRegisterSubmit} onClose={handleCloseRegisterForm} />}
          </>
        ) : (
          selectedRoom ? (
            <ReservationForm room={selectedRoom} onSubmit={handleSubmitReservation} onReturn={handleReturn} user={currentUser} />
          ) : showProfile ? (
            <Profile user={currentUser} onClose={handleCloseProfile} />
          ) : showReservations ? (
            <Reservations reservations={reservations} onClose={handleCloseReservations} />
          ) : showAddRoomForm ? (
            <AddRoomForm onClose={handleCloseAddRoomForm} onSubmit={handleAddRoom} />
          ) : showScheduler ? (
            <Scheduler reservations={reservations} onClose={handleCloseScheduler} />
          ) : (
            <RoomList rooms={filteredRooms} onReserve={handleReserve} onDelete={handleDeleteRoom} userType={currentUser?.userType} />
          )
        )}
      </main>
      <Footer />
      {isLoggedIn && (
        <button className="calendar-button" onClick={handleSchedulerClick}>
          <FontAwesomeIcon icon={faCalendarAlt} />
        </button>
      )}
    </div>
  );
};

export default App;
