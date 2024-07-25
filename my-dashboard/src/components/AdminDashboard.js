import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/applications');
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  const handleStatusChange = async (applicationId, status, email) => {
    try {
      await axios.post(`http://localhost:5000/admin/applications/${applicationId}/status`, {
        status,
        email,
      });
      setApplications(applications.filter(app => app.id !== applicationId));
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  return (
    <div>
      <h2>Pending Applications</h2>
      <ul>
        {applications.map(application => (
          <li key={application.id}>
            <p>Email: {application.email}</p>
            <p>Program ID: {application.program_id}</p>
            <p>Status: {application.status}</p>
            <button onClick={() => handleStatusChange(application.id, 'accepted', application.email)}>Accept</button>
            <button onClick={() => handleStatusChange(application.id, 'rejected', application.email)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
