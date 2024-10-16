// routes/savings.ts
import { Router } from 'express';
import Savings from '../models/Savings';

const router = Router();

// Create a new saving entry
router.post('/', async (req, res) => {
  const { userId, amount } = req.body;

  try {
    const newSavings = new Savings({ userId, amount });
    const savedSavings = await newSavings.save();
    res.status(201).json({ message: 'Savings entry created successfully!', savings: savedSavings });
  } catch (error) {
    console.error('Error creating savings entry:', error);
    res.status(500).json({ message: 'Error creating savings entry.' });
  }
});

// Get all savings
router.get('/', async (req, res) => {
  try {
    const savings = await Savings.find();
    res.json(savings);
  } catch (error) {
    console.error('Error fetching savings:', error);
    res.status(500).json({ message: 'Error fetching savings.' });
  }
});

// Get savings by user ID
router.get('/:userId', async (req, res) => {
  try {
    const savings = await Savings.find({ userId: req.params.userId });
    res.json(savings);
  } catch (error) {
    console.error('Error fetching savings:', error);
    res.status(500).json({ message: 'Error fetching savings.' });
  }
});

// Update savings by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedSavings = await Savings.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedSavings) {
      res.json(updatedSavings);
    } else {
      res.status(404).json({ message: 'Savings entry not found.' });
    }
  } catch (error) {
    console.error('Error updating savings entry:', error);
    res.status(500).json({ message: 'Error updating savings entry.' });
  }
});

// Delete savings by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedSavings = await Savings.findByIdAndDelete(req.params.id);
    if (deletedSavings) {
      res.json({ message: 'Savings entry deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Savings entry not found.' });
    }
  } catch (error) {
    console.error('Error deleting savings entry:', error);
    res.status(500).json({ message: 'Error deleting savings entry.' });
  }
});

export default router;
