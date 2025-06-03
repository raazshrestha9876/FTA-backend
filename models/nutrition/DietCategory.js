import mongoose from "mongoose";

const dietCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
const DietCategory = mongoose.model("DietCategory", dietCategorySchema);
export default DietCategory;