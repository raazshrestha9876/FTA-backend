import * as ProfileService from "../../services/profileService";

export const getUserProfile = async (req, res) => {
  try {
    const user = await ProfileService.getUserProfile(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await ProfileService.updateUserProfile(
      req.params.userId,
      req.body
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUserProfile = async (req, res) => {
    try{
        const user = await ProfileService.deleteUserProfile(req.params.userId);
        res.status(200).json({message: "User deleted successfully"});
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

