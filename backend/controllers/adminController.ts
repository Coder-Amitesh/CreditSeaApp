import { Request, Response } from 'express';
import Loan from '../models/Loan';
import User from '../models/User'; 
import Borrower from '../models/Borrower'; 
import Savings from '../models/Savings'; 
import OtherAccount from '../models/OtherAccount'; 


export const getAdminStats = async (req: Request, res: Response) => {
  try {
    const activeUsers = await User.countDocuments(); 
    const borrowers = await Borrower.countDocuments(); 
    const totalSavings = await Savings.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]); 
    const repaidLoans = await Loan.countDocuments({ status: 'Approved' }); 
    const loans = await Loan.countDocuments(); 
    const otherAccounts = await OtherAccount.countDocuments(); 

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


export const getLoans = async (req: Request, res: Response) => {
  try {
    const loans = await Loan.find(); 
    res.status(200).json(loans); 
  } catch (error) {
    console.error('Error fetching loans:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
