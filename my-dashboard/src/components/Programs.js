// programs/Programs.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Programs = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get('/api/programs'); // Assuming your backend endpoint for fetching programs is '/api/programs'
      setPrograms(response.data);
    } catch (error) {
      console.error('Error fetching programs:', error);
      // Handle error fetching programs
    }
  };

  return (
    <div>
      <h1>Available Programs</h1>
      <div className="program-list">
        {programs.map((program) => (
          <div key={program.program_id} className="program-card">
            <img src={program.image_url} alt={program.name} />
            <div>
              <h2>{program.name}</h2>
              <p>Category: {program.category}</p>
              <p>Duration: {program.duration} months</p>
              <p>Start Date: {new Date(program.start_date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programs;
