import mongoose, { Document, Schema } from 'mongoose';

export interface ILoan extends Document {
  fullName: string;
  loanTenure: number;
  loanReason: string;
  loanAmount: number;
  employmentStatus: string;
  employmentAddress: string;
  acceptTerms: boolean;
}

const loanSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  loanTenure: { type: Number, required: true },
  loanReason: { type: String, required: true },
  loanAmount: { type: Number, required: true },
  employmentStatus: { type: String, required: true },
  employmentAddress: { type: String, required: true },
  acceptTerms: { type: Boolean, required: true },
}, { timestamps: true });

const Loan = mongoose.model<ILoan>('Loan', loanSchema);
export default Loan;
