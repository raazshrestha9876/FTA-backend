import Workout from "../../models/exercise/Workout.js";
import User from "../../models/User.js";

export const startWorkout = async (userId, exerciseIds) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const newWorkout = new Workout({
    user: userId,
    exercises: exerciseIds,
    startTime: new Date(),
    caloriesBurned: 0,
    duration: 0,
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
  const durationHours = durationMinutes / 60;

  const userWeightKg = workout.user.weight || 70;
  let totalCalories = 0;

  workout.exercises.forEach((exercise) => {
    const MET = exercise.metValue;
    totalCalories += MET * userWeightKg * durationHours;
  });

  workout.endTime = endTime;
  workout.duration = durationMinutes;
  workout.caloriesBurned = Math.round(totalCalories);

  await workout.save();
  return workout;
};
