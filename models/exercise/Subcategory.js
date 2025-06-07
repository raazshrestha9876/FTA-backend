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
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Subcategory = mongoose.model("Subcategory", SubcategorySchema);
export default Subcategory;
