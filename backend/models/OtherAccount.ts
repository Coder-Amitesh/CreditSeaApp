
import { Schema, model, Document } from 'mongoose';


export interface IOtherAccount extends Document {
  userId: string; 
  balance: number;
}


const otherAccountSchema = new Schema<IOtherAccount>({
  userId: { type: String, required: true },
  balance: { type: Number, required: true },
});


const OtherAccountModel = model<IOtherAccount>('OtherAccount', otherAccountSchema);
export default OtherAccountModel;
