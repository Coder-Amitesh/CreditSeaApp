import { Request, Response } from 'express';
import Loan from '../models/Loan'; // Make sure this path is correct
import User from '../models/User'; // Import User model
import Borrower from '../models/Borrower'; // Import Borrower model
import Savings from '../models/Savings'; // Import Savings model
import OtherAccount from '../models/OtherAccount'; // Import OtherAccount model

// Route for getting admin statistics
export const getAdminStats = async (req: Request, res: Response) => {
  try {
    const activeUsers = await User.countDocuments(); // Count active users
    const borrowers = await Borrower.countDocuments(); // Count borrowers
    const totalSavings = await Savings.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]); // Total savings calculation
    const repaidLoans = await Loan.countDocuments({ status: 'Approved' }); // Count approved loans
    const loans = await Loan.countDocuments(); // Count total loans
    const otherAccounts = await OtherAccount.countDocuments(); // Count other accounts

    res.json({
      activeUsers,
      borrowers,
      totalSavings: totalSavings.length > 0 ? totalSavings[0].total : 0,
      repaidLoans,
      loans,
      otherAccounts,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Add this route for fetching all loans
export const getLoans = async (req: Request, res: Response) => {
  try {
    const loans = await Loan.find(); // Fetch all loans from the database
    res.status(200).json(loans); // Send the loans back as a response
  } catch (error) {
    console.error('Error fetching loans:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
