import Exercise from "../../models/exercise/Exercise.js";

export const getAllExercises = async (page, limit) => {
  let skip = 0;
  let page;
  let limit;

  if (page && limit) {
    page = parseInt(page);
    limit = parseInt(limit);
    skip = (page - 1) * limit;
  }
  const exercises = await Exercise.find()
    .populate({
      path: "subcategory",
      populate: { path: "category", select: "name" },
    })
    .limit(limit)
    .skip(skip);

  const totalCounts = await Exercise.countDocuments();

  return { exercises, totalCounts };
};

export const getExerciseById = async (exerciseId) => {
  const exercise = await Exercise.findById(exerciseId).populate({
    path: "subcategory",
    populate: { path: "category" },
  });
  return exercise;
};

// export const getExercisesByDay = async (dayId) => {
//   const exercises = await Exercise.find({ day: dayId }).populate({
//     path: "day",
//     populate: { path: "category" },
//   });
//   return exercises;
// };

export const createExercise = async (exerciseData, exerciseImage) => {
  console.log(exerciseData);
  const {
    subcategory,
    name,
    sets,
    duration,
    instructions,
    focusArea,
    videoUrl,
  } = exerciseData;

  const exercise = new Exercise({
    subcategory,
    name,
    sets,
    duration,
    instructions,
    focusArea,
    videoUrl,
    image: exerciseImage,
  });
  await exercise.save();
  return exercise;
};

// export const updateExercise = async (exerciseId, exerciseData) => {
//   const { name, instructions, image, equipment, videoUrl, day } = exerciseData;
//   const exercise = await Exercise.findByIdAndUpdate(
//     exerciseId,
//     { name, instructions, image, equipment, videoUrl, day },
//     { new: true }
//   );
//   return exercise;
// };
// export const deleteExercise = async (exerciseId) => {
//   const exercise = await Exercise.findByIdAndDelete(exerciseId);
//   return exercise;
// };
