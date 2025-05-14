import mongoose from "mongoose";

const DaySchema = new mongoose.Schema({
    category: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    dayNumber: {
        type: Number,
        required: true,
        min: 1,
        max: 7
    },
    muscleType: {
        type: String,
        enum: ["chest", "back", "shoulders", "arms", "legs", "full-body", "rest"],
        required: true
    }
}, { timestamps: true });

const Day = mongoose.model("Day", DaySchema);
export default Day;
