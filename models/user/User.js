import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false // Exclude password from queries by default
    },
    gender: {
        type: String, 
        enum: ['male', 'female', 'other'],
    },
    age: {
        type: Number,
        min: 0,
        max: 120
    },
    height: {
        type: Number,
        min: 0
    },
    weight: {
        type: Number,
        min: 0
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