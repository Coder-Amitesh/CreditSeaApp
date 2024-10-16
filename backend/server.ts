import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { getAdminStats, getLoans } from './controllers/adminController'; // Ensure 'adminController' matches exactly
import Loan from './models/Loan'; // Import Loan model
import User from './models/User'; // Import User model
import Borrower from './models/Borrower'; // Import Borrower model
import Savings from './models/Savings'; // Import Savings model
import OtherAccount from './models/OtherAccount'; // Import OtherAccount model
import getAllLoans from './controllers/loancontroll';

// MongoDB connection string
const mongoURI = 'mongodb+srv://amitesh:Amitesh@123@cluster0.pdys0.mongodb.net/credit_app_db?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Initialize Express app
const app = express();

// CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Adjust this if your frontend is hosted elsewhere
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions)); // Use CORS middleware
app.use(express.json()); // Middleware for parsing application/json

// Route for submitting loan applications
app.post('/api/loans', async (req, res) => {
  const { fullName, loanTenure, loanReason, loanAmount, employmentStatus, employmentAddress, acceptTerms } = req.body;

  try {
    const newLoan = new Loan({
      fullName,
      loanTenure,
      loanReason,
      loanAmount,
      employmentStatus,
      employmentAddress,
      acceptTerms,
    });

    const savedLoan = await newLoan.save();
    res.status(201).json({ message: 'Loan application submitted successfully!', loan: savedLoan });
  } catch (error) {
    console.error('Error saving loan application:', error);
    res.status(500).json({ message: 'An error occurred while submitting the loan application.' });
  }
});

// Function to calculate total savings
const getTotalSavings = async () => {
  const savingsData = await Savings.aggregate([
    { $group: { _id: null, total: { $sum: '$amount' } } },
  ]);
  return savingsData.length > 0 ? savingsData[0].total : 0;
};

// Route for getting admin statistics
app.get('/api/admin/stats', getAdminStats); // Use admin controller for stats

// Add this route for fetching all loans
app.get('/api/admin/loans', getLoans); // Use admin controller for fetching loans
app.get('/api/loans',getAllLoans);

// Add the routes for Borrower, Savings, and OtherAccount
// Create a borrower
app.post('/api/borrowers', async (req, res) => {
  const { userId, loanId, loanAmount, status } = req.body;

  try {
    const newBorrower = new Borrower({
      userId,
      loanId,
      loanAmount,
      status,
    });

    const savedBorrower = await newBorrower.save();
    res.status(201).json({ message: 'Borrower created successfully!', borrower: savedBorrower });
  } catch (error) {
    console.error('Error saving borrower:', error);
    res.status(500).json({ message: 'An error occurred while creating the borrower.' });
  }
});

// Get all borrowers
app.get('/api/borrowers', async (req, res) => {
  try {
    const borrowers = await Borrower.find();
    res.status(200).json(borrowers);
  } catch (error) {
    console.error('Error fetching borrowers:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create savings entry
app.post('/api/savings', async (req, res) => {
  const { userId, amount } = req.body;

  try {
    const newSavings = new Savings({
      userId,
      amount,
    });

    const savedSavings = await newSavings.save();
    res.status(201).json({ message: 'Savings created successfully!', savings: savedSavings });
  } catch (error) {
    console.error('Error saving savings:', error);
    res.status(500).json({ message: 'An error occurred while creating the savings.' });
  }
});

// Get all savings
app.get('/api/savings', async (req, res) => {
  try {
    const savings = await Savings.find();
    res.status(200).json(savings);
  } catch (error) {
    console.error('Error fetching savings:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create other account entry
app.post('/api/other-accounts', async (req, res) => {
  const { userId, balance } = req.body;

  try {
    const newOtherAccount = new OtherAccount({
      userId,
      balance,
    });

    const savedOtherAccount = await newOtherAccount.save();
    res.status(201).json({ message: 'Other account created successfully!', otherAccount: savedOtherAccount });
  } catch (error) {
    console.error('Error saving other account:', error);
    res.status(500).json({ message: 'An error occurred while creating the other account.' });
  }
});

// Get all other accounts
app.get('/api/other-accounts', async (req, res) => {
  try {
    const otherAccounts = await OtherAccount.find();
    res.status(200).json(otherAccounts);
  } catch (error) {
    console.error('Error fetching other accounts:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Define the route for fetching loans
app.get('/api/loans', async (req, res) => {
  try {
      const loans = await Loan.find(); // Fetch loans from the database
      res.status(200).json(loans); // Return the loans
  } catch (error) {
      console.error('Error fetching loans:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Update the port to 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
