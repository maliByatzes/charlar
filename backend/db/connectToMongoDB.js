import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error}`);
  }
};

export default connectToMongoDB;
