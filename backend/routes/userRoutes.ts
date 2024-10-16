import express from 'express';
import {
  getLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoan,
} from '../controllers/loanController';

const router = express.Router();

// Define your routes
router.get('/', getLoans); // Get all loans
router.get('/:id', getLoanById); // Get loan by ID
router.post('/', createLoan); // Create a new loan
router.put('/:id', updateLoan); // Update loan by ID
router.delete('/:id', deleteLoan); // Delete loan by ID

export default router;
