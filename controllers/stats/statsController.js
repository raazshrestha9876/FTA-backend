import Exercise from "../../models/exercise/Exercise.js";
import ExerciseWorkout from "../../models/exercise/ExerciseWorkout.js";
import Diet from "../../models/nutrition/Diet.js";
import User from "../../models/user/User.js";

export const adminCardStats = async (req, res) => {
  try {
    const totalExercise = await Exercise.countDocuments();
    const totalUser = await User.countDocuments({ role: { $ne: "admin" } });
    const totalNutrition = await Diet.countDocuments();
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

export const userCaloriesStatsAnalytics = async (req, res) => {
  try {
    const results = await ExerciseWorkout.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user) } },
      {
        $facet: {
          dailyCalories: [
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                totalDailyCalories: { $sum: "$caloriesBurned" },
              },
            },
            { $sort: { _id: 1 } },
            {
              $project: {
                _id: 0,
                date: "$_id",
                totalDailyCalories: 1,
              },
            },
          ],
          averageWeekCalories: [
            {
              $group: {
                _id: {
                  $dateToString: { format: "%U", date: "$createdAt" },
                },
                averageWeekCalories: { $avg: "$caloriesBurned" },
              },
            },
            { $sort: { _id: 1 } },
            {
              $project: {
                _id: 0,
                week: "$_id",
                averageWeekCalories: 1,
              },
            },
          ],
          cardWorkoutStats: [
            {
              $project: {
                caloriesBurned: 1,
                duration: 1,
                streakDays: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
              },
            },
            {
              $group: {
                _id: null,
                totalCalories: { $sum: "$caloriesBurned" },
                totalWorkouts: { $sum: 1 },
                totalHoursTrained: { $sum: "$duration" },
                streakDays: { $addToSet: "$streakDays" },
              },
            },
            {
              $project: {
                _id: 0,
                totalCalories: 1,
                totalWorkouts: 1,
                totalHoursTrained: 1,
                streakDays: { $size: "$streakDays" },
              },
            },
          ],
        },
      },
    ]);

    const dailyCalories = results[0].dailyCalories;
    const cardWorkoutStats = results[0].cardWorkoutStats[0];
    const averageWeekCalories = results[0].averageWeekCalories[0] || {
      averageWeekCalories: 0,
    };

    res.status(200).json({
      dailyCalories,
      averageWeekCalories,
      cardWorkoutStats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const totalCaloriesBurnedAllUserStats = async (req, res) => {
  try {
    const results = await ExerciseWorkout.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalDailyCalories: { $sum: "$caloriesBurned" },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          totalDailyCalories: 1,
        },
      },
    ]);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
