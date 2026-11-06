import mongoose from 'mongoose';

let isMongoConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tripwise';
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Quick fail if mongo daemon is not running
    });
    isMongoConnected = true;
    console.log(`✅ MongoDB Connected successfully to: ${mongoose.connection.host}`);
  } catch (error) {
    isMongoConnected = false;
    console.log(`⚠️  MongoDB not available (${error.message}).`);
    console.log(`📦 Switched to local JSON persistence engine in server/data/db.json. All user accounts and trips will be saved reliably!`);
  }
};

export const getMongoStatus = () => isMongoConnected;
