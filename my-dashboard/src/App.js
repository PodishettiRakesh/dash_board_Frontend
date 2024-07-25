import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import StudentLogin from './components/StudentLogin';
import StudentSignup from './components/StudentSignup.js';
import AdminLogin from './components/AdminLogin';
import AdminSignup from './components/AdminSignup.js';
import Programs from './components/Programs'; // Import Programs component
import StudentApply from './components/StudentApply.js';
import AdminDashboard from './components/AdminDashboard.js';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/student-signup" element={<StudentSignup />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-signup" element={<AdminSignup />} />
      <Route path="/programs" element={<Programs />} /> {/* Route for Programs */}
      <Route path="/programs/apply/:program_id" element={<StudentApply />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
    </Routes>
  );
};

export default App;
