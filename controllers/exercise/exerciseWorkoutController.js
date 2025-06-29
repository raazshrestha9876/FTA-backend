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

export const userWorkoutHistory = async (req, res) => {
  try {
    const workout = await ExerciseWorkout.find({ user: req.user })
      .populate("exercise")
      .sort({
        createdAt: -1,
      });
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
