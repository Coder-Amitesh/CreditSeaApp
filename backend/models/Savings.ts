import mongoose, { Document, Schema } from 'mongoose';

export interface ISavings extends Document {
  userId: string;
  amount: number;
}

const savingsSchema: Schema = new Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Savings = mongoose.model<ISavings>('Savings', savingsSchema);
export default Savings;
