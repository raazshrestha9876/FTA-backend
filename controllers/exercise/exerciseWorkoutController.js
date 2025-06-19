import mongoose from "mongoose";
import * as workoutService from "../../services/exercise/exerciseWorkoutService.js";
import ExerciseWorkout from "../../models/exercise/ExerciseWorkout.js";

export const startWorkout = async (req, res) => {
  try {
    const { exerciseId } = req.body;
    const workout = await workoutService.startWorkout(req.user, exerciseId);
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const stopWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const workout = await workoutService.stopWorkout(id);
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
                  $dateToString: { format: "%Y-%m-%d", date: "$created_at" },
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
          totalCalories: [
            {
              $group: {
                _id: "$user",
                totalCalories: { $sum: "$caloriesBurned" },
              },
            },
            {
              $project: {
                _id: 0,
                user: "$_id",
                totalCalories: 1,
              },
            },
          ],
        },
      },
    ]);

    const dailyCalories = results[0].dailyCalories;
    const totalCalories = results[0].totalCalories[0] || { totalCalories: 0 };

    res.status(200).json({
      dailyCalories,
      totalCalories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const totalCaloriesBurnedAllUserStats = async (req, res) => {
  try {
    const results = ExerciseWorkout.aggregate([
      {
        $group: {
          _id: null,
          totalCalories: { $sum: "$caloriesBurned" },
        },
      },
      {
        $project: {
          _id: 0,
          totalCalories: 1,
        },
      },
    ]);
    res.status(200).json(results[0] || { totalCalories: 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
