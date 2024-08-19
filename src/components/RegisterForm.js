import React, { useState } from 'react';
import './RegisterForm.css';
import axios from 'axios';

const RegisterForm = ({ onSubmit, onClose }) => {
  const [userType, setUserType] = useState('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [administration, setAdministration] = useState('');
  const [city, setCity] = useState('Dammam');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      userType,
      name,
      email,
      password,
      administration,
      city,
    };

    try {
      const response = await axios.post('http://localhost:5001/api/register', newUser);
      alert(response.data.message);
      onClose();
    } catch (error) {
      console.error('Error registering user:', error);
      alert(error.response?.data?.message || 'Error registering user');
    }
  };

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div>
          <label>User Type:</label>
          <select value={userType} onChange={(e) => setUserType(e.target.value)} required>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Department:</label>
          <input
            type="text"
            value={administration}
            onChange={(e) => setAdministration(e.target.value)}
            required
          />
        </div>
        <div>
          <label>City:</label>
          <select value={city} onChange={(e) => setCity(e.target.value)} required>
            <option value="Dammam">Dammam</option>
            <option value="Khobar">Khobar</option>
            <option value="Hafar Al Batin">Hafar Al Batin</option>
            <option value="Al Ahsa">Al Ahsa</option>
            <option value="Qatif">Qatif</option>
            <option value="Aljubail">Aljubail</option>
          </select>
        </div>
        <div className="register-form-buttons">
          <button type="submit">Register</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
