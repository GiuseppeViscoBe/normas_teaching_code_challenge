
import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config();

const connectionString = process.env.MONGO_URI || '';

const connectToDb = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to database: ", error);
    process.exit(1);
  }

};

export default connectToDb;
