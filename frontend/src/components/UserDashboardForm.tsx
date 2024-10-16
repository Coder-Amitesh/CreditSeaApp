import React, { useState } from 'react';
import axios from 'axios';
import '../style.css'; 

const UserDashboardForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    loanTenure: '',
    loanReason: '',
    loanAmount: '',
    employmentStatus: '',
    employmentAddress: '',
    acceptTerms: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, acceptTerms: e.target.checked });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/loans', formData);
      console.log('Loan Applied:', response.data);

      setSuccessMessage('Loan application submitted successfully!');
      setFormData({
        fullName: '',
        loanTenure: '',
        loanReason: '',
        loanAmount: '',
        employmentStatus: '',
        employmentAddress: '',
        acceptTerms: false,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error details:', error.response?.data);
      } else {
        console.error('Unexpected error:', error);
      }
      setErrorMessage('An error occurred while submitting the loan application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="user-dashboard">
      <div className="form-header">
        <h2>Apply for a Loan</h2>
      </div>

      <form onSubmit={handleSubmit} className="application-form">
        <div className="form-group">
          <label>Full Name as it appears on bank account</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label>Loan Tenure (in months)</label>
          <input
            type="number"
            name="loanTenure"
            value={formData.loanTenure}
            onChange={handleChange}
            placeholder="Enter loan tenure"
            required
          />
        </div>

        <div className="form-group">
          <label>Reason for Loan</label>
          <textarea
            name="loanReason"
            value={formData.loanReason}
            onChange={handleChange}
            placeholder="Enter reason for loan"
            required
          />
        </div>

        <div className="form-group">
          <label>How Much Do You Need?</label>
          <input
            type="number"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleChange}
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="form-group">
          <label>Employment Status</label>
          <input
            type="text"
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleChange}
            placeholder="Enter employment status"
            required
          />
        </div>

        <div className="form-group">
          <label>Employment Address</label>
          <input
            type="text"
            name="employmentAddress"
            value={formData.employmentAddress}
            onChange={handleChange}
            placeholder="Enter employment address"
            required
          />
        </div>

        <div className="form-group terms">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleCheckbox}
            required
          />
          <label>I have read the important information and accept the terms.</label>
        </div>

        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>

        {/* Display success or error messages */}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default UserDashboardForm;
