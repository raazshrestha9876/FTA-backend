import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema(
  {
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    sets: {
      type: Number,
      required: true,
      min: 1,
    },
    duration: {
      type: Number,
      required: true,
      min: 20,
      max: 60,
    },
    metValue: {
      type: Number,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
    },
    focusArea: {
      type: [string],
      required: true,
      enum: [
        "legs",
        "arms",
        "core",
        "back",
        "chest",
        "shoulders",
        "glutes",
        "full body",
        "cardio",
        "upper body",
        "lower body",
        "abs",
        "biceps",
        "triceps",
        "quads",
        "hamstrings",
        "calves",
        "mobility",
        "balance",
        "flexibility",
        "endurance",
        "strength",
      ],
    },
  },
  { timestamps: true }
);

const Exercise = mongoose.model("Exercise", ExerciseSchema);
export default Exercise;
