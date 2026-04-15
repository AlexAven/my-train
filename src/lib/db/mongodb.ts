import mongoose from 'mongoose';

declare global {
  var mongoosePromise: Promise<typeof mongoose> | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDatabase = async (): Promise<typeof mongoose> => {
  if (!MONGODB_URI) {
    throw new Error('Определи переменную MONGODB_URI в файле .env.local');
  }

  if (globalThis.mongoosePromise) {
    return globalThis.mongoosePromise;
  }

  globalThis.mongoosePromise = mongoose.connect(MONGODB_URI);

  return globalThis.mongoosePromise;
};

export default connectToDatabase;
