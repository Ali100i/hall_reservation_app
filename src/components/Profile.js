import React from 'react';
import './Profile.css';

const Profile = ({ user, onClose }) => {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <button className="close-button" onClick={onClose}>Return</button>
        <h2>User Profile</h2>
        <div className="profile-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>User Type:</strong> {user.userType}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Department:</strong> {user.administration}</p>
        </div>
        <button className="edit-button">Edit</button> 
      </div>
    </div>
  );
};

export default Profile;
