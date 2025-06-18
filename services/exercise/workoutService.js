import Workout from "../../models/exercise/Workout.js";
import User from "../../models/user/User.js";

export const startWorkout = async (userId, exerciseId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  const newWorkout = new Workout({
    user: userId,
    exercise: exerciseId,
    startTime: new Date(),
    caloriesBurned: 0,
    duration: 0,
  });
  await newWorkout.save();
  return newWorkout;
};

export const stopWorkout = async (workoutId) => {
  const workout = await Workout.findById(workoutId).populate("exercise user");
  if (!workout) {
    throw new Error("Workout not found");
  }
  const endTime = new Date();
  const durationMs = endTime - workout.startTime;
  const durationMinutes = Math.floor(durationMs / 60000);
  const durationHours = durationMinutes / 60;

  const userWeightKg = workout.user.weight || 70;

  const MET = workout.exercise.metValue;
  const calories = MET * userWeightKg * durationHours;

  workout.endTime = endTime;
  workout.duration = durationMinutes;
  workout.caloriesBurned = Math.round(calories);

  await workout.save();
  return workout;
};

