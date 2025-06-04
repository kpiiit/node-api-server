import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || '';
if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI in environment variables.');
}

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected (Atlas)');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
