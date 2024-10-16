import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { getAdminStats, getLoans } from './controllers/adminController'; 
import Loan from './models/Loan'; 
import User from './models/User'; 
import Borrower from './models/Borrower'; 
import Savings from './models/Savings'; 
import OtherAccount from './models/OtherAccount'; 
import getAllLoans from './controllers/loancontroll';


const mongoURI = 'mongodb+srv://amitesh:Amitesh@123@cluster0.pdys0.mongodb.net/credit_app_db?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();


const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
};

app.use(cors(corsOptions)); 
app.use(express.json()); 


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


app.get('/api/admin/stats', getAdminStats); 


app.get('/api/admin/loans', getLoans); 
app.get('/api/loans',getAllLoans);


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


app.get('/api/other-accounts', async (req, res) => {
  try {
    const otherAccounts = await OtherAccount.find();
    res.status(200).json(otherAccounts);
  } catch (error) {
    console.error('Error fetching other accounts:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/loans', async (req, res) => {
  try {
      const loans = await Loan.find(); 
      res.status(200).json(loans); 
  } catch (error) {
      console.error('Error fetching loans:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
