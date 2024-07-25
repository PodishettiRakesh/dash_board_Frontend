import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming JWT token is stored in localStorage
      const response = await axios.get('http://localhost:5000/student/applications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handlePaymentClick = (applicationId) => {
    navigate(`/applications/${applicationId}/payment`);
  };

  return (
    <div className="dashboard-container">
      <h1>My Applications</h1>
      <ul className="application-list">
        {applications.map((application) => (
          <li key={application.id} className="application-container">
            <p>Program ID: {application.program_id}</p>
            <p>Status: {application.status}</p>
            {application.status === 'accepted' && (
              <button onClick={() => handlePaymentClick(application.id)}>Pay Now</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
