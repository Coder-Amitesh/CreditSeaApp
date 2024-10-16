"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLoan = exports.updateLoan = exports.createLoan = exports.getLoanById = exports.getLoans = void 0;
// Sample data for demonstration
const loans = [
    { id: 1, name: 'Personal Loan' },
    { id: 2, name: 'Home Loan' },
];
// Controller Functions
const getLoans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json(loans);
});
exports.getLoans = getLoans;
const getLoanById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loan = loans.find((loan) => loan.id === Number(req.params.id));
    if (!loan) {
        return res.status(404).json({ message: 'Loan not found' });
    }
    res.status(200).json(loan);
});
exports.getLoanById = getLoanById;
const createLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newLoan = Object.assign({ id: loans.length + 1 }, req.body);
    loans.push(newLoan);
    res.status(201).json(newLoan);
});
exports.createLoan = createLoan;
const updateLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loanIndex = loans.findIndex((loan) => loan.id === Number(req.params.id));
    if (loanIndex === -1) {
        return res.status(404).json({ message: 'Loan not found' });
    }
    loans[loanIndex] = Object.assign({ id: Number(req.params.id) }, req.body);
    res.status(200).json(loans[loanIndex]);
});
exports.updateLoan = updateLoan;
const deleteLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loanIndex = loans.findIndex((loan) => loan.id === Number(req.params.id));
    if (loanIndex === -1) {
        return res.status(404).json({ message: 'Loan not found' });
    }
    loans.splice(loanIndex, 1);
    res.status(204).send();
});
exports.deleteLoan = deleteLoan;
