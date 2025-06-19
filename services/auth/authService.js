import User from "../../models/user/User.js";
import bcrypt from "bcryptjs";

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
  const { name, email, password, age, height, weight } = userData;
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
        height,
        weight,
      },
    },
    { new: true }
  );
  return updatedUser;
};

export const updateUserImage = async (userId, userData) => {
  const {image} = userData;
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  await User.findByIdAndUpdate(userId, {image:image}, { new: true });
};

