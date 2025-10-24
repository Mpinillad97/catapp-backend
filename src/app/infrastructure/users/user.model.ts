import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true }
}, { timestamps: true });

export const UserModel = model('User', UserSchema);
