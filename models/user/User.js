import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
       
    },
    gender: {
        type: String, 
        enum: ['male', 'female', 'other'],
    },
    age: {
        type: Number,
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    resetPasswordToken: String, // Token to reset password
    resetPasswordExpires: Date, // Expiration date for the reset token
}, {timestamps: true});


const User = mongoose.model('User', userSchema); 
export default User;