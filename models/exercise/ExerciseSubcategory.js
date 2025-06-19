import mongoose from "mongoose";

const exerciseSubcategorySchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExerciseCategory",
      required: true,
    },
    dayNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 7,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

exerciseSubcategorySchema.index(
  { dayNumber: 1, category: 1 },
  { unique: true }
);

const ExerciseSubcategory = mongoose.model(
  "ExerciseSubcategory",
  exerciseSubcategorySchema
);
export default ExerciseSubcategory;
