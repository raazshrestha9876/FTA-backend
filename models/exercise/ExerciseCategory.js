import mongoose from "mongoose";

const exerciseCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    }
   
});

const ExerciseCategory = mongoose.model("ExerciseCategory", exerciseCategorySchema);
export default ExerciseCategory;