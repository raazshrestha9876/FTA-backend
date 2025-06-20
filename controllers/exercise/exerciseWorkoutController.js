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
    const { durationSeconds } = req.body;
    const workout = await workoutService.stopWorkout(id, durationSeconds);
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
