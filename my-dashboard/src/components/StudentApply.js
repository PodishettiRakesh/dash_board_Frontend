// Apply.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Apply = () => {
  const { programId } = useParams();
  const [email, setEmail] = useState(''); // State to store the email
  const [personalDetails, setPersonalDetails] = useState('');
  const [educationalBackground, setEducationalBackground] = useState('');
  const [statementOfPurpose, setStatementOfPurpose] = useState('');

  useEffect(() => {
    // Retrieve email from localStorage
    const storedEmail = localStorage.getItem('studentEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []); // Empty dependency array ensures this runs only on component mount

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/application/submit', {
        programId,
        email, // Include email in the submission data
        personalDetails,
        educationalBackground,
        statementOfPurpose,
      });
      console.log('Application submitted:', response.data);
      // Optionally redirect or show a confirmation message
    } catch (error) {
      console.error('Error submitting application:', error);
      // Handle error display
    }
  };

  return (
    <div>
      <h2>Apply for Program</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            readOnly // Make email field read-only
          />
        </div>
        <div>
          <label>Personal Details:</label>
          <input
            type="text"
            value={personalDetails}
            onChange={(e) => setPersonalDetails(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Educational Background:</label>
          <input
            type="text"
            value={educationalBackground}
            onChange={(e) => setEducationalBackground(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Statement of Purpose:</label>
          <input
            type="text"
            value={statementOfPurpose}
            onChange={(e) => setStatementOfPurpose(e.target.value)}
          />
        </div>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default Apply;
