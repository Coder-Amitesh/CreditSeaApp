import mongoose, { Document, Schema } from 'mongoose';

export interface IBorrower extends Document {
  userId: string;
  loanId: string;
  loanAmount: number;
  status: string;
}

const borrowerSchema: Schema = new Schema({
  userId: { type: String, required: true },
  loanId: { type: String, required: true },
  loanAmount: { type: Number, required: true },
  status: { type: String, required: true },
});

const Borrower = mongoose.model<IBorrower>('Borrower', borrowerSchema);
export default Borrower;
