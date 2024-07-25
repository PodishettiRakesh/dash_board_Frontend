import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const email = localStorage.getItem('studentEmail'); // Retrieve email from localStorage
      console.log(email, "email email email");

      if (!email) {
        console.error('No email found in localStorage');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/application/student/${email}`);
        console.log('API RESPONSE DATA:', response.data);
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="student-dashboard">
      <h2>My Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Program ID</th>
            <th>Program Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.program_id}>
              <td>{application.program_id}</td>
              <td>{application.program_name}</td>
              <td>{application.email}</td>
              <td>{application.status}</td>
              <td>
                {application.status === 'accepted' && (
                  <button onClick={() => handlePayNow(application.program_id)}>Pay Now</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const handlePayNow = (programId) => {
  console.log('Initiate payment for program ID:', programId);
  // Implement payment logic here
};

export default StudentDashboard;
