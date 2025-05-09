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
        default: 'other'
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
    resetPasswordToken: String,
    resetPasswordExpires: Date,
}, {timestamps: true});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Only hash the password if it has been modified

    const salt = await bcrypt.genSalt(10); // Generate a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password with the salt
    next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); // Compare the entered password with the hashed password
}

userSchema.methods.getResetPasswordToken = function() {
    // Generate a token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash the token and set it to resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set the expiration time for the token (1 hour)
    this.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour

    return resetToken; // Return the plain token for sending in email
}

const User = mongoose.model('User', userSchema); // Create the User model from the schema
export default User; // Export the User model for use in other files