import Exercise from "../../models/exercise/Exercise";

export const getAllExercises = async () => {
  const exercises = await Exercise.find().populate({
    path: "day",
    populate: { path: "category" },
  });
  return exercises;
};

export const getExerciseById = async (exerciseId) => {
  const exercise = await Exercise.findById(exerciseId).populate({
    path: "day",
    populate: { path: "category" },
  });
  return exercise;
};

export const getExercisesByDay = async (dayId) => {
  const exercises = await Exercise.find({ day: dayId }).populate({
    path: "day",
    populate: { path: "category" },
  });
  return exercises;
};

export const createExercise = async (exerciseData) => {
  const { name, instructions, image, equipment, videoUrl, day } = exerciseData;
  const exercise = new Exercise({
    name,
    instructions,
    image,
    equipment,
    videoUrl,
    day,
  });
  await exercise.save();
  return exercise;
};

export const updateExercise = async (exerciseId, exerciseData) => {
  const { name, instructions, image, equipment, videoUrl, day } = exerciseData;
  const exercise = await Exercise.findByIdAndUpdate(
    exerciseId,
    { name, instructions, image, equipment, videoUrl, day },
    { new: true }
  );
  return exercise;
};
export const deleteExercise = async (exerciseId) => {
  const exercise = await Exercise.findByIdAndDelete(exerciseId);
  return exercise;
};
