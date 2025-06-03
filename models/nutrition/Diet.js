import mongoose from "mongoose";

const dietSchema = new mongoose.Schema({
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DietSubcategory",
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  intake: {
    type: Number,
    required: true,
  },
  macronutrient: {
    protein: {
      type: Number,
      required: true,
    },
    carbohydrates: {
      type: Number,
      required: true,
    },
    fats: {
      type: Number,
      required: true,
    },
  },
  features: {
    type: Array,
    length: 2,
    required: true,
  },
  benefits: {
    type: String,
    required: true,
  },
});
const Diet = mongoose.model("Diet", dietSchema);
export default Diet;
