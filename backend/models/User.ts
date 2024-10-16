import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  role: string;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['User', 'Verifier', 'Admin'], default: 'User' },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
