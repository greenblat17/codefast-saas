import mongoose from "mongoose";
import Board from "@/models/Board";
import User from "@/models/User";

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error("Mongoose error: " + e.message);
  }
};

export default connectMongo;
