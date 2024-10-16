import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style.css'; 

const UserDashboardLoan: React.FC = () => {
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const fetchLoans = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/loans'); 
      setLoans(response.data);
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  };

  useEffect(() => {
    const fetchLoans = async () => {
      setLoading(true); 
      try {
        const response = await axios.get('http://localhost:5000/api/loans'); 
        setLoans(response.data); 
      } catch (error) {
        console.error('Error fetching loans:', error);
        setErrorMessage('Failed to load loans.'); 
      } finally {
        setLoading(false); 
      }
    };

    fetchLoans();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const filteredLoans = loans.filter(loan => {
    // Check if customerName exists before calling .toLowerCase()
    const matchesSearch = loan.customerName && loan.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || loan.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="user-dashboard">
      <h2 className="dashboard-title">Loan Dashboard</h2>

      <div className="deficit-overview">
        <h3 className="deficit-title">Deficit: ₹0.00</h3>
        <div className="deficit-buttons">
          <button className="action-button">Get A Loan</button>
          <button className="action-button">Borrow Cash</button>
          <button className="action-button">Deposit Cash</button>
        </div>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="search-filter">
        <input
          type="text"
          placeholder="Search for loans"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="search-button">Search</button>

        <div className="filters">
          <select className="filter-select" onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="all">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <h3 className="applied-loans-title">Applied Loans</h3>
      <table className="loan-activity-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Date Applied</th>
            <th>Status</th>
            <th>Loan Officer</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredLoans.length > 0 ? (
            filteredLoans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.customerName || 'Unknown'}</td>
                <td>{loan.dateApplied}</td>
                <td>{loan.status}</td>
                <td>{loan.loanOfficer}</td>
                <td>{loan.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No loans found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboardLoan;
