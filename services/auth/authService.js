import User from "../models/user/User";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail";


export const register = async (userData) => {
    const {name, email , password, age, gender, height, weight, role} = userData;
    const userExists = await User.find({ email });
    if (userExists.length > 0) {
        throw new Error("User already exists");
    }
    if(role === "admin"){
        throw new Error("You cannot register as an admin");
    }
    const user = new User({
        name,
        email,
        password,
        age, 
        gender, 
        height,
        weight,
        role: role || "user",
    });
    await user.save();
    return user;
}

export const login = async (userData) => {
    const { email, password } = userData;
    const user = await User.findOne({ email }).select("+password");
    if(!user) {
        throw new Error("Invalid email or password");
    }
    if(!email || !(await user.matchPassword(password))) {
        throw new Error("Please provide email and password");
    }
    return user;
}

export const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}

export const forgetPassword = async (email) => {
    const user = await User.findOne({ email });
    if(!user){
        throw new Error("User not found with this email");
    }
    const resetToken = user.getResetPasswordToken();
    //validateBeforeSave is set to false to skip validation
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    await sendEmail({
        email: user.email,
        subject: "Password Recovery",
        message: `Your password reset token is: ${resetUrl}`,
    });
    return resetToken;
};


export const resetPassword = async (token, newPassword) => {

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
        // Check if the hashed token matches the one stored in the database
        // and if the token has not expired
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() },
    }) 
    if(!user) {
        throw new Error("Token is invalid or has expired");
    }
    user.password = newPassword;
    // Clear the reset token and expiration date
    // This is important for security reasons to prevent the token from being reused
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    return user;
}