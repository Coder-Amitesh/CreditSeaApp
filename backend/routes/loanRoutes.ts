import express from 'express';
import { createLoan, getLoans, getLoanById, updateLoan, deleteLoan } from '../controllers/loanController';

const router = express.Router();

router.get('/loans', getLoans);
router.post('/loans', createLoan);
router.get('/loans/:id', getLoanById);
router.put('/loans/:id', updateLoan);
router.delete('/loans/:id', deleteLoan);

export default router;
