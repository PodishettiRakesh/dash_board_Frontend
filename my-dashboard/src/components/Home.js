import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleLoginClick = () => {
    if (userType === 'student') {
      navigate('/student-login');
    } else if (userType === 'admin') {
      navigate('/admin-login');
    }
  };

  const handleSignupClick = () => {
    if (userType === 'student') {
      navigate('/student-signup');
    } else if (userType === 'admin') {
      navigate('/admin-signup');
    }
  };

  return (
    <div>
      <h1>Welcome to the Online Education Platform</h1>
      <label>
        Select User Type:
        <select value={userType} onChange={handleUserTypeChange}>
          <option value="">Select</option>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
      </label>

      {userType && (
        <div>
          <button onClick={handleLoginClick}>Login</button>
          <button onClick={handleSignupClick}>Signup</button>
        </div>
      )}
    </div>
  );
};

export default Home;
