import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema(
  {
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExerciseSubcategory",
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
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
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Exercise = mongoose.model("Exercise", ExerciseSchema);
export default Exercise;
