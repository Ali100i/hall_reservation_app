import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

const Login = ({ onLogin, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double submission
    setIsSubmitting(true);
    console.log('Sending login request with:', { email, password });
    try {
      const response = await axios.post('http://localhost:5001/api/login', { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Login successful:', response.data);
      onLogin(response.data.user);
    } catch (error) {
      console.error('Error logging in:', error);
      console.error('Error response data:', error.response?.data);
      alert(error.response?.data?.message || 'Error logging in');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
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
        <button type="submit" disabled={isSubmitting}>Login</button>
        <div className="register-link">
          <a href="#" onClick={onRegister}>Register an account</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
