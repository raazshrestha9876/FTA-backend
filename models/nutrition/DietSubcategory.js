import mongoose from "mongoose";

const dietSubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DietCategory",
    required: true,
  },
});
const DietSubcategory = mongoose.model(
  "DietSubcategory",
  dietSubcategorySchema
);
export default DietSubcategory;
