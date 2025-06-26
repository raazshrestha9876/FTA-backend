import Exercise from "../../models/exercise/Exercise.js";
import ExerciseWorkout from "../../models/exercise/ExerciseWorkout.js";

export const adminCardStats = async (req, res) => {
  try {
    const totalExercise = await Exercise.countDocuments();
    const totalUser = await User.countDocuments({ role: { $ne: "admin" } });
    const totalNutrition = await Nutrition.countDocuments();
    const engagedUserIds = await ExerciseWorkout.distinct("user");
    const engagedUserCount = await User.countDocuments({
      _id: { $in: engagedUserIds },
      role: { $ne: "admin" },
    });
    const engagementRate =
      totalUser > 0
        ? ((engagedUserCount / totalUser) * 100).toFixed(2)
        : "0.00";
    res.status(200).json({
      totalExercise,
      totalUser,
      totalNutrition,
      engagementRate: `${engagementRate}%`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

