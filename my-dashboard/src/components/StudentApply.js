// Apply.js

import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Apply = () => {
  const { programId } = useParams();
  const [personalDetails, setPersonalDetails] = useState('');
  const [educationalBackground, setEducationalBackground] = useState('');
  const [statementOfPurpose, setStatementOfPurpose] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/application/submit', {
        programId,
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
          <label>Personal Details:</label>
          <textarea value={personalDetails} onChange={(e) => setPersonalDetails(e.target.value)} required />
        </div>
        <div>
          <label>Educational Background:</label>
          <textarea value={educationalBackground} onChange={(e) => setEducationalBackground(e.target.value)} required />
        </div>
        <div>
          <label>Statement of Purpose:</label>
          <textarea value={statementOfPurpose} onChange={(e) => setStatementOfPurpose(e.target.value)} />
        </div>
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default Apply;
