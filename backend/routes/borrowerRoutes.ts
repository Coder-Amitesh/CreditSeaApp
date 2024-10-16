// routes/borrower.ts
import { Router } from 'express';
import Borrower from '../models/Borrower';

const router = Router();

// Create a new borrower
router.post('/', async (req, res) => {
  const { userId, loanId, loanAmount, status } = req.body;

  try {
    const newBorrower = new Borrower({ userId, loanId, loanAmount, status });
    const savedBorrower = await newBorrower.save();
    res.status(201).json({ message: 'Borrower created successfully!', borrower: savedBorrower });
  } catch (error) {
    console.error('Error creating borrower:', error);
    res.status(500).json({ message: 'Error creating borrower.' });
  }
});

// Get all borrowers
router.get('/', async (req, res) => {
  try {
    const borrowers = await Borrower.find();
    res.json(borrowers);
  } catch (error) {
    console.error('Error fetching borrowers:', error);
    res.status(500).json({ message: 'Error fetching borrowers.' });
  }
});

// Get borrower by ID
router.get('/:id', async (req, res) => {
  try {
    const borrower = await Borrower.findById(req.params.id);
    if (borrower) {
      res.json(borrower);
    } else {
      res.status(404).json({ message: 'Borrower not found.' });
    }
  } catch (error) {
    console.error('Error fetching borrower:', error);
    res.status(500).json({ message: 'Error fetching borrower.' });
  }
});

// Update borrower by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedBorrower = await Borrower.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedBorrower) {
      res.json(updatedBorrower);
    } else {
      res.status(404).json({ message: 'Borrower not found.' });
    }
  } catch (error) {
    console.error('Error updating borrower:', error);
    res.status(500).json({ message: 'Error updating borrower.' });
  }
});

// Delete borrower by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBorrower = await Borrower.findByIdAndDelete(req.params.id);
    if (deletedBorrower) {
      res.json({ message: 'Borrower deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Borrower not found.' });
    }
  } catch (error) {
    console.error('Error deleting borrower:', error);
    res.status(500).json({ message: 'Error deleting borrower.' });
  }
});

export default router;
