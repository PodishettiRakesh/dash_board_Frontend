import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Call useNavigate at the top level of the component

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      console.log('Student Login:', response.data);
      if (response.data.message === 'Login successful') {
        localStorage.setItem('studentEmail', email);
        navigate('/programs'); // Use the navigate function here
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Student Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default StudentLogin;
