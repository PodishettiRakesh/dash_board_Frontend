import React, { useState } from 'react';
import axios from 'axios';

const StudentSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const response = await axios.post('https://ec2-15-207-100-250.ap-south-1.compute.amazonaws.com:5000/auth/signup', { email, password });
      console.log('Student Signup:', response.data);
      alert('Signup successful');
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Signup failed');
    }
  };

  return (
    <div>
      <h2>Student Signup</h2>
      <form onSubmit={handleSignup}>
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
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default StudentSignup;
