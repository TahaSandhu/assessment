import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || '');
    console.log(`[database]: MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[database]: Error: ${error.message}`);
    } else {
      console.error('[database]: Unknown error connecting to MongoDB');
    }
    throw error;
  }
};

export default connectDB;
