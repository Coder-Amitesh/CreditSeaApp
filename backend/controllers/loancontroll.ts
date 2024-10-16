// loanController.ts
import { Request, Response } from 'express';
import Loan from '../models/Loan';

const getAllLoans = async (req: Request, res: Response) => {
    try {
        const loans = await Loan.find(); 
        res.status(200).json(loans);
    } catch (error) {
        console.error('Error fetching loans:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
export default getAllLoans;
