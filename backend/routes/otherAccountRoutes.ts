// routes/otherAccount.ts
import { Router } from 'express';
import OtherAccount from '../models/OtherAccount';

const router = Router();

// Create a new other account entry
router.post('/', async (req, res) => {
  const { userId, balance } = req.body;

  try {
    const newOtherAccount = new OtherAccount({ userId, balance });
    const savedOtherAccount = await newOtherAccount.save();
    res.status(201).json({ message: 'Other account created successfully!', account: savedOtherAccount });
  } catch (error) {
    console.error('Error creating other account:', error);
    res.status(500).json({ message: 'Error creating other account.' });
  }
});

// Get all other accounts
router.get('/', async (req, res) => {
  try {
    const otherAccounts = await OtherAccount.find();
    res.json(otherAccounts);
  } catch (error) {
    console.error('Error fetching other accounts:', error);
    res.status(500).json({ message: 'Error fetching other accounts.' });
  }
});

// Get other account by user ID
router.get('/:userId', async (req, res) => {
  try {
    const otherAccount = await OtherAccount.find({ userId: req.params.userId });
    res.json(otherAccount);
  } catch (error) {
    console.error('Error fetching other account:', error);
    res.status(500).json({ message: 'Error fetching other account.' });
  }
});

// Update other account by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedOtherAccount = await OtherAccount.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedOtherAccount) {
      res.json(updatedOtherAccount);
    } else {
      res.status(404).json({ message: 'Other account not found.' });
    }
  } catch (error) {
    console.error('Error updating other account:', error);
    res.status(500).json({ message: 'Error updating other account.' });
  }
});

// Delete other account by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedOtherAccount = await OtherAccount.findByIdAndDelete(req.params.id);
    if (deletedOtherAccount) {
      res.json({ message: 'Other account deleted successfully.' });
    } else {
      res.status(404).json({ message: 'Other account not found.' });
    }
  } catch (error) {
    console.error('Error deleting other account:', error);
    res.status(500).json({ message: 'Error deleting other account.' });
  }
});

export default router;
