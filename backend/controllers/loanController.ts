import { Request, Response } from 'express';

const loans = [
  { id: 1, name: 'Personal Loan' },
  { id: 2, name: 'Home Loan' },
];

export const getLoans = async (req: Request, res: Response) => {
  res.status(200).json(loans);
};

export const getLoanById = async (req: Request, res: Response) => {
  const loan = loans.find((loan) => loan.id === Number(req.params.id));
  if (!loan) {
    return res.status(404).json({ message: 'Loan not found' });
  }
  res.status(200).json(loan);
};

export const createLoan = async (req: Request, res: Response) => {
  const newLoan = { id: loans.length + 1, ...req.body };
  loans.push(newLoan);
  res.status(201).json(newLoan);
};

export const updateLoan = async (req: Request, res: Response) => {
  const loanIndex = loans.findIndex((loan) => loan.id === Number(req.params.id));
  if (loanIndex === -1) {
    return res.status(404).json({ message: 'Loan not found' });
  }
  loans[loanIndex] = { id: Number(req.params.id), ...req.body };
  res.status(200).json(loans[loanIndex]);
};

export const deleteLoan = async (req: Request, res: Response) => {
  const loanIndex = loans.findIndex((loan) => loan.id === Number(req.params.id));
  if (loanIndex === -1) {
    return res.status(404).json({ message: 'Loan not found' });
  }
  loans.splice(loanIndex, 1);
  res.status(204).send();
};
