// components/Programs.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/programs'); 
      setPrograms(response.data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  };

  const handleApplyClick = (programId) => {
    navigate(`/apply/${programId}`); // Navigate to the apply page for the selected program
  };

  return (
    <div>
      <h1>Available Programs</h1>
      <ul>
        {programs.map((program) => (
          <li key={program.id}>
            <h3>{program.name}</h3>
            <img src={`http://localhost:5000${program.image_url}`} alt={program.name}/>
            <p>Category: {program.category}</p>
            <p>Duration: {program.duration+" Months"}</p>
            <p>Start Date: {program.start_date}</p>
            <button onClick={() => handleApplyClick(program.id)}>Apply Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Programs;
