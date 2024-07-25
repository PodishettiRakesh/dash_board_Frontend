import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './StudentDashboard.css'; // Import appropriate CSS

const StudentDashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const email = localStorage.getItem('studentEmail'); // Retrieve email from localStorage
      try {
        const response = await axios.get(`http://localhost:5000/application/student?email=${email}`);
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
            <th>Email</th>
            <th>Personal Details</th>
            <th>Educational Background</th>
            <th>Statement of Purpose</th>
            <th>Status</th>
            <th>Submission Date</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              <td>{application.program_id}</td>
              <td>{application.email}</td>
              <td>{application.personal_details}</td>
              <td>{application.educational_background}</td>
              <td>{application.statement_of_purpose}</td>
              <td>{application.status}</td>
              <td>{new Date(application.submission_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDashboard;
