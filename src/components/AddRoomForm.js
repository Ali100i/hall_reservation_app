import React, { useState, useEffect } from 'react';
import './AddRoomForm.css';

const AddRoomForm = ({ onClose, onSubmit }) => {
  const [city, setCity] = useState('');
  const [building, setBuilding] = useState('');
  const [floor, setFloor] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [capacity, setCapacity] = useState('');
  const [smartScreen, setSmartScreen] = useState('');
  const [projector, setProjector] = useState('');
  const [callingScreen, setCallingScreen] = useState('');
  const [responsibleAdmin, setResponsibleAdmin] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    console.log('Current State:', {
      city,
      building,
      floor,
      roomNumber,
      capacity,
      smartScreen,
      projector,
      callingScreen,
      responsibleAdmin,
      images
    });
  }, [city, building, floor, roomNumber, capacity, smartScreen, projector, callingScreen, responsibleAdmin, images]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setBuilding('');
    console.log('City changed to:', e.target.value);
  };

  const handleBuildingChange = (e) => {
    setBuilding(e.target.value);
    console.log('Building changed to:', e.target.value);
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRoom = {
      city,
      building,
      floor,
      roomNumber,
      capacity,
      smartScreen,
      projector,
      callingScreen,
      responsibleAdmin,
      images
    };
    console.log('New Room Details:', newRoom);
    onSubmit(newRoom);
    onClose();
  };

  return (
    <div className="add-room-form-container">
      <form className="add-room-form" onSubmit={handleSubmit}>
        <h2>Add Room</h2>
        <div>
          <label>Choose City:</label>
          <select value={city} onChange={handleCityChange} required>
            <option value="">Select a city</option>
            <option value="Dammam">Dammam</option>
            <option value="Khobar">Khobar</option>
            <option value="Hafar Al Batin">Hafar Al Batin</option>
            <option value="Al Ahsa">Al Ahsa</option>
            <option value="Qatif">Qatif</option>
            <option value="Aljubail">Aljubail</option>
          </select>
        </div>
        <div>
          <label>Choose Building:</label>
          <select value={building} onChange={handleBuildingChange} required>
            <option value="">Select a building</option>
            <option value="main building">Main Building</option>
            {city === 'Dammam' && (
              <>
                <option value="IT building">IT Building</option>
                <option value="customer service building">Customer Service Building</option>
              </>
            )}
          </select>
        </div>
        <div>
          <label>Choose Floor:</label>
          <select value={floor} onChange={(e) => setFloor(e.target.value)} required>
            <option value="">Select a floor</option>
            <option value="1st floor">1st Floor</option>
            <option value="2nd floor">2nd Floor</option>
          </select>
        </div>
        <div>
          <label>Room Number:</label>
          <input
            type="text"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Room Capacity:</label>
          <input
            type="text"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Smart Screen:</label>
          <select value={smartScreen} onChange={(e) => setSmartScreen(e.target.value)} required>
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Projector:</label>
          <select value={projector} onChange={(e) => setProjector(e.target.value)} required>
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Calling Screen:</label>
          <select value={callingScreen} onChange={(e) => setCallingScreen(e.target.value)} required>
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label>Responsible Administration:</label>
          <input
            type="text"
            value={responsibleAdmin}
            onChange={(e) => setResponsibleAdmin(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Images:</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <div className="add-room-form-buttons">
          <button type="submit">Add Room</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddRoomForm;
