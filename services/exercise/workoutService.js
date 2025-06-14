import Exercise from "../../models/exercise/Exercise.js";
import Workout from "../../models/exercise/Workout";
import User from "../../models/User.js";
import { MET_MAP } from "../../utils/constants.js";

export const startWorkout = async (userId, exerciseIds) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  const newWorkout = new Workout({
    user: userId,
    exercises: exerciseIds,
    startTime: new Date(),
    duration: 0,
    caloriesBurned: 0,
  });
  await newWorkout.save();
  return newWorkout;
};

export const stopWorkout = async (workoutId) => {
  const workout = await Workout.findById(workoutId).populate("exercises user");
  if (!workout) {
    throw new Error("Workout not found");
  }
  const endTime = new Date();
  const durationMs = endTime - workout.startTime;
  const durationMinutes = Math.floor(durationMs / 60000);

  let totalCaloriesBurned = 0;
  workout.exercises.forEach((exercise) => {
    const MET = MET_MAP[exercise.metValue];
    const weightKg = workout.user.weight;
    const durationHours = durationMinutes / 60;
    totalCaloriesBurned += MET * weightKg * durationHours;
  });
  workout.endTime = endTime;
  workout.duration = durationMinutes;
  workout.caloriesBurned = totalCaloriesBurned;
  await workout.save();
  return workout;
};
