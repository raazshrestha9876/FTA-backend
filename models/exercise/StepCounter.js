import mongoose from "mongoose";

const stepCounterSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    goal: {
      type: Number,
      required: true,
    },
    steps: {
      type: Number,
      default: 0,
    },
    calories: {
      type: Number,
      default: 0,
    },
    distance: {
      type: Number,
      default: 0,
    },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const StepCounter = mongoose.model("StepCounter", stepCounterSchema);
export default StepCounter;
