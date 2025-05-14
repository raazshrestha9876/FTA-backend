import mongoose from "mongoose";

const ExerciseSchema = new mongoose.Schema({
    day: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Day",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    instructions: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    equipment: {
        type: String,
        required: true,
        enum: ["none", "dumbbell", "barbell", "resistance band", "machine", "kettlebell", "bodyweight"]
    },
    videoUrl: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const Exercise = mongoose.model("Exercise", ExerciseSchema);
export default Exercise;
