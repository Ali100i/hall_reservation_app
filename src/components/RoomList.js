import React from 'react';
import MeetingRoom from './MeetingRoom';
import './RoomList.css';

const RoomList = ({ rooms, onReserve, onDelete, userType }) => {
  return (
    <div className="room-list">
      {rooms.map((room) => (
        <MeetingRoom
          key={room.roomNumber}
          room={room}
          onReserve={onReserve}
          onDelete={onDelete}
          userType={userType} 
        />
      ))}
    </div>
  );
};

export default RoomList;
