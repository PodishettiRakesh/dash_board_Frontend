import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Programs.css';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get('https://ec2-15-207-100-250.ap-south-1.compute.amazonaws.com:5000/programs');
      console.log("Programs data:", response.data);
      setPrograms(response.data);
      setFilteredPrograms(response.data); // Initialize filtered programs
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  };

  useEffect(() => {
    handleFilterChange();
  }, [category, duration, startDate]);

  const handleFilterChange = () => {
    let filtered = programs;
  
    if (category) {
      filtered = filtered.filter(program => program.category === category);
    }
    if (duration) {
      filtered = filtered.filter(program => parseInt(program.duration) === parseInt(duration));
    }
    if (startDate) {
      filtered = filtered.filter(program => {
        const programStartDate = new Date(program.start_date).toISOString().slice(0, 10);
        return new Date(programStartDate) <= new Date(startDate);
      });
    }
    
  
    setFilteredPrograms(filtered);
  };
  

  const handleApplyClick = (program_id) => {
    console.log("program Id clicked", program_id);
    navigate(`/programs/apply/${program_id}`);
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="programs-container">
      <h1>Available Programs</h1>
      <button onClick={handleDashboardClick} className="dashboard-button">Dashboard</button>

      <div className="filters">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Programming">Programming</option>
          <option value="Mathematics">Mathematics</option>
        </select>
        <select value={duration} onChange={(e) => setDuration(e.target.value)}>
          <option value="">All Durations</option>
          <option value="9 months">9 months</option>
          <option value="12 months">12 months</option>
        </select>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <ul className="program-list">
        {filteredPrograms.map((program) => (
          <li key={program.program_id} className="program-container">
            <h3>{program.name}</h3>
            <img src={program.image_url} alt={program.name} className="program-image" />
            <p>Category: {program.category}</p>
            <p>Duration: {program.duration}</p>
            <p>Start Date: {new Date(program.start_date).toLocaleDateString()}</p>
            <button onClick={() => handleApplyClick(program.program_id)}>Apply Now</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Programs;
