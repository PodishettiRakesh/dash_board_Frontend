import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      const email = localStorage.getItem('studentEmail'); // Retrieve email from localStorage
      console.log(email, "email email email");

      if (!email) {
        console.error('No email found in localStorage');
        return;
      }

      try {
        const response = await axios.get(`http://ec2-15-207-100-250.ap-south-1.compute.amazonaws.com:5000/application/student/${email}`);
        console.log('API RESPONSE DATA:', response.data);
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  const handlePayNow = (application) => {
    navigate('/Payment/:id', {
      state: {
        email: application.email,
        programId: application.program_id,
        programName: application.program_name,
      },
    });
  };
  

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
                  <button onClick={() => handlePayNow(application)}>Pay Now</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default StudentDashboard;
