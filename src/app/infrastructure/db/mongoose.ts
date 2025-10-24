import mongoose from 'mongoose';
import { env } from '../../../config/env';

export async function connectMongo(): Promise<void> {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(env.mongoUri);
}

export async function disconnectMongo(): Promise<void> {
  await mongoose.disconnect();
}
