import User from "../models/user/User";

export const getUserProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
export const updateUserProfile = async (userId, userData) => {
  const { name, email, password, age, height, weight } = userData;
  const updatedUser = { name, email, age, height, weight };
  if(password){
    const genSalt = await bcrypt.genSalt(10);
    updatedUser.password = await bcrypt.hash(password,genSalt); 

  }
  const user = await User.findByIdAndUpdate(
    userId,
    updatedUser,
    { new: true, runValidators: true }
  );
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const deleteUserProfile = async (userId) => {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};