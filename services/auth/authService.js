import User from "../../models/user/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/generateToken.js";
// import jwt from "jsonwebtoken";
// import crypto from "crypto";
// import { sendEmail } from "../utils/sendEmail";

export const register = async (userData) => {
  const { name, email, password, age, gender, height, weight, role } = userData;
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already exists");
  }
  if (role === "admin") {
    throw new Error("You cannot register as an admin");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    age,
    gender,
    height,
    weight,
    role,
  });
  await user.save();
  return user;
};

export const login = async (userData) => {
  const { email, password } = userData;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isValidPassword = bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }
  return user;
};

export const getUser = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const updateUser = async (userId, userData) => {
  const { name, email, password, age, gender, height, weight } = userData;
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        name,
        email,
        password: hashedPassword,
        age,
        gender,
        height,
        weight,
      },
    },
    { new: true }
  );
  return updatedUser;
};

// export const forgetPassword = async (email) => {
//     const user = await User.findOne({ email });
//     if(!user){
//         throw new Error("User not found with this email");
//     }
//     const resetToken = user.getResetPasswordToken();

//     await user.save({ validateBeforeSave: false });

//     const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
//     await sendEmail({
//         email: user.email,
//         subject: "Password Recovery",
//         message: `Your password reset token is: ${resetUrl}`,
//     });
//     return resetToken;
// };

// export const resetPassword = async (token, newPassword) => {

//     const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
//     const user = await User.findOne({
//         // Check if the hashed token matches the one stored in the database
//         // and if the token has not expired
//         resetPasswordToken: hashedToken,
//         resetPasswordExpire: { $gt: Date.now() },
//     })
//     if(!user) {
//         throw new Error("Token is invalid or has expired");
//     }
//     user.password = newPassword;
//     // Clear the reset token and expiration date
//     // This is important for security reasons to prevent the token from being reused
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
//     await user.save();
//     return user;
// }
