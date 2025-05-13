import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import connectDB from "../config/db";

dotenv.config();

const seedAdmin = async () => {
  try {
    connectDB();
    const existsingAdmin = await User.findOne({ role: "admin" });
    if (existsingAdmin) {
      console.log("Admin already exists");
      return;
    } else {
      const admin = new User({
        name: "Admin",
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
      });
      await admin.save();
      console.log("Admin created successfully");
    }
  } catch (err) {
    console.error("Error seeding admin:", err);
  }
};

// Run the seed function
seedAdmin();
