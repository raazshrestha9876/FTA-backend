import mongoose from "mongoose";

const waterIntakeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    water: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const WaterIntake = mongoose.model("WaterIntake", waterIntakeSchema);
export default WaterIntake;
