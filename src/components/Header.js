import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = ({ isLoggedIn, onLogout, user, onProfileClick, onReservationsClick, onCityChange, selectedCity, onAddRoomClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(prevState => !prevState);
  };

  const handleProfileClick = () => {
    onProfileClick();
    setShowDropdown(false);
  };

  const handleReservationsClick = () => {
    onReservationsClick();
    setShowDropdown(false);
  };

  return (
    <header>
      <h1>Meeting Hall Reservation System</h1>
      {isLoggedIn && (
        <div className="header-right">
          {user.userType === 'admin' && (
            <button className="add-rooms-button" onClick={onAddRoomClick}>Add Rooms</button>
          )}
          <select className="city-select" value={selectedCity} onChange={(e) => onCityChange(e.target.value)}>
            <option value="Dammam">Dammam</option>
            <option value="Khobar">Khobar</option>
            <option value="Hafar Al Batin">Hafar Al Batin</option>
            <option value="Al Ahsa">Al Ahsa</option>
            <option value="Qatif">Qatif</option>
            <option value="Aljubail">Aljubail</option>
          </select>
          <div className="user-icon-container">
            <FontAwesomeIcon icon={faUser} className="user-icon" onClick={toggleDropdown} />
            {showDropdown && (
              <div className="dropdown-menu visible">
                <a href="#" className="dropdown-item" onClick={handleProfileClick}>Profile</a>
                <a href="#" className="dropdown-item" onClick={handleReservationsClick}>Reservations</a>
                <a href="#" className="dropdown-item" onClick={onLogout}>Log Out</a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
