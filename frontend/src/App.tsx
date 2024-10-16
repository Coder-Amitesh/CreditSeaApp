import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import UserDashboardForm from './components/UserDashboardForm';
import UserDashboardLoan from './components/UserDashboardLoan';
//import VerifierDashboard from './components/VerifierDashboard';
import './App.css';

const App: React.FC = () => {
  const [name, setName] = useState('User');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="profile">
            <span className="profile-name">{name}</span>
            <span className="hamburger" onClick={toggleDropdown}>
              &#9776;
            </span>
            {isDropdownOpen && (
              <div className="dropdown">
                <Link to="/admin">Admin Dashboard</Link>
                <Link to="/loan-application">My Loans</Link>
                <Link to="/loan-status">My Loan Status</Link>
              </div>
            )}
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/loan-application" />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/loan-application" element={<UserDashboardForm />} />
            <Route path="/loan-status" element={<UserDashboardLoan />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
