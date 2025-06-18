import mongoose from "mongoose";
import Workout from "../../models/exercise/Workout.js";
import * as workoutService from "../../services/exercise/workoutService.js";

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

export const getTotalCalories = async (req, res) => {
  try {
    const results = await Workout.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user) }},
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
    ]);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
