// models/OtherAccount.ts
import { Schema, model, Document } from 'mongoose';

// Define an other account interface
export interface IOtherAccount extends Document {
  userId: string; // Reference to the user
  balance: number;
}

// Create an other account schema
const otherAccountSchema = new Schema<IOtherAccount>({
  userId: { type: String, required: true },
  balance: { type: Number, required: true },
});

// Create an other account model
const OtherAccountModel = model<IOtherAccount>('OtherAccount', otherAccountSchema);
export default OtherAccountModel;
