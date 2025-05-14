import mongoose from 'mongoose';

const workoutSchema =  new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    exercises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true
    }],
    startTime: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    caloriesBurned: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    
}, { timestamps: true });

const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;