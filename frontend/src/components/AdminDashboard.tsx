import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style.css';
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import img5 from '../assets/5.png';
import img6 from '../assets/6.png';

const AdminDashboard: React.FC = () => {
  const [loans, setLoans] = useState<any[]>([]);
  const [stats, setStats] = useState({
    activeUsers: 0,
    borrowers: 0,
    totalSavings: 0,
    repaidLoans: 0,
    loans: 0,
    otherAccounts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchLoansAndStats = async () => {
      try {
        const loansResponse = await axios.get('http://localhost:5000/api/admin/loans');
        setLoans(loansResponse.data);

        const statsResponse = await axios.get('http://localhost:5000/api/admin/stats');
        setStats(statsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLoansAndStats();
  }, []);

  const handleSort = () => {
    // Implement sorting logic here
  };

  const handleFilter = () => {
    // Implement filtering logic here
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <img src={img1} alt="User" className="user-logo" />
        <h3>Options</h3>
        <ul className="sidebar-options">
          <li>Loan Parameters</li>
          <li>Repayments</li>
          <li>Expenses</li>
          <li>Accounting</li>
          <li>Reports</li>
          <li>Collateral</li>
          <li>Investor Accounts</li>
          <li>Calendar</li>
          <li>Settings</li>
        </ul>
      </div>

      <div className="dashboard-stats">
        <h2>Admin Dashboard</h2>

        {/* Dashboard Stats */}
        <div className="stat-container">
          <div className="stat-item">
            <div className="stat-logo">
              <img src={img2} alt="Active Users" />
            </div>
            <div className="stat-value">
              <h3>{stats.activeUsers} Active Users</h3>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-logo">
              <img src={img3} alt="Borrowers" />
            </div>
            <div className="stat-value">
              <h3>{stats.borrowers} Borrowers</h3>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-logo">
              <img src={img4} alt="Savings" />
            </div>
            <div className="stat-value">
              <h3>₹{stats.totalSavings.toLocaleString()} Savings</h3>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-logo">
              <img src={img5} alt="Repaid Loans" />
            </div>
            <div className="stat-value">
              <h3>{stats.repaidLoans} Repaid Loans</h3>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-logo">
              <img src={img6} alt="Loans" />
            </div>
            <div className="stat-value">
              <h3>{stats.loans} Loans</h3>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-logo">
              <img src={img1} alt="Other Accounts" />
            </div>
            <div className="stat-value">
              <h3>{stats.otherAccounts} Other Accounts</h3>
            </div>
          </div>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Recent Loans Section */}
        <h3>Recent Loans</h3>
        <div className="recent-loans-container">
          <div className="recent-loans-controls">
            <button onClick={handleSort}>Sort</button>
            <button onClick={handleFilter}>Filter</button>
          </div>
          <table className="loan-activity-table">
            <thead>
              <tr>
                <th>Recent Activity</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loans.length > 0 ? (
                loans.map((loan: any) => (
                  <tr key={loan.id}>
                    <td>{loan.recentActivity}</td>
                    <td>{loan.customerName}</td>
                    <td>{loan.date}</td>
                    <td>
                      <button>{loan.isPending ? 'Pending Verification' : 'Manage'}</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No recent loans available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
