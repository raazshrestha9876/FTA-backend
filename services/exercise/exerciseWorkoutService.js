import ExerciseWorkout from "../../models/exercise/ExerciseWorkout.js";
import User from "../../models/user/User.js";

export const startWorkout = async (userId, exerciseId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  const newWorkout = new ExerciseWorkout({
    user: userId,
    exercise: exerciseId,
    startTime: new Date(),
    caloriesBurned: 0,
    duration: 0,
  });
  await newWorkout.save();
  return newWorkout;
};

export const stopWorkout = async (workoutId, durationSeconds) => {
  const workout = await ExerciseWorkout.findById(workoutId).populate(
    "exercise user"
  );
  if (!workout) {
    throw new Error("Workout not found");
  }
  const endTime = new Date();

  const userWeightKg = workout.user.weight || 70;
  const MET = workout.exercise.metValue;

  const durationHours = durationSeconds / 3600;
  const calories = MET * userWeightKg * durationHours;

  workout.endTime = endTime;
  workout.duration = durationSeconds;
  workout.caloriesBurned = calories.toFixed(2);

  await workout.save();
  return workout;
};
