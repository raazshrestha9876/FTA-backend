import mongoose from "mongoose";

const exerciseWorkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
    },
    duration: {
      type: Number,
    },
    caloriesBurned: {
      type: Number,
    },
  },
  { timestamps: true }
);

const ExerciseWorkout = mongoose.model("ExerciseWorkout", exerciseWorkoutSchema);
export default ExerciseWorkout;
