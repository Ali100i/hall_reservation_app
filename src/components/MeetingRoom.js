import React from 'react';
import './MeetingRoom.css';

const MeetingRoom = ({ room, onReserve, onDelete, userType }) => {
  return (
    <div className="meeting-room">
      <h3>{room.building} / Room {room.roomNumber}</h3>
      <p>Smart Screen: {room.smartScreen ? 'Yes' : 'No'}</p>
      <p>Projector: {room.projector ? 'Yes' : 'No'}</p>
      <p>Calling Screen: {room.callingScreen ? 'Yes' : 'No'}</p>
      <button onClick={() => onReserve(room)}>Reserve</button>
      {userType === 'admin' && (
        <>
          <button onClick={() => onDelete(room.roomNumber)}>Delete</button>
          <button>Edit</button>
        </>
      )}
    </div>
  );
};

export default MeetingRoom;
