import mongoose from "mongoose";

const SubcategorySchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
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
      // No global unique here (unless intended)
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Unique dayNumber per category
SubcategorySchema.index({ dayNumber: 1, category: 1 }, { unique: true });

// Optional: Add this if name should be unique per category
// SubcategorySchema.index({ category: 1, name: 1 }, { unique: true });

const Subcategory = mongoose.model("Subcategory", SubcategorySchema);
export default Subcategory;