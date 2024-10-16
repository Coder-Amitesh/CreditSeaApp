"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loanController_1 = require("../controllers/loanController");
const router = express_1.default.Router();
// Define your routes
router.get('/', loanController_1.getLoans);
router.get('/:id', loanController_1.getLoanById);
router.post('/', loanController_1.createLoan);
router.put('/:id', loanController_1.updateLoan);
router.delete('/:id', loanController_1.deleteLoan);
exports.default = router;
