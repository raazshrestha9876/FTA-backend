import User from "../models/User";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail";

export const register = async (userData) => {
    const {name, email , password} = userData;
    const userExists = await User.find({ email });
    if (userExists.length > 0) {
        throw new Error("User already exists");
    }
    const user = new User({
        name,
        email,
        password,
    });
    await user.save();
    return user;
}

export const login = async (userData) => {
    const { email, password } = userData;
    const user = await User.findOne({ email }).select("+password");
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
    const resetToken = user.generateResetToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    await sendEmail({
        email: user.email,
        subject: "Password Recovery",
        message: `Your password reset token is: ${resetUrl}`,
    });
    return resetToken;
};