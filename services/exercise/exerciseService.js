import Exercise from "../../models/exercise/Exercise.js";

export const getAllExercises = async (page, limit, searchTerm) => {
  let skip = 0;
  let pg;
  let lim;

  if (page && limit) {
    pg = parseInt(page);
    lim = parseInt(limit);
    skip = (pg - 1) * lim;
  }
  const exercises = await Exercise.find({
    name: { $regex: searchTerm, $options: "i" },
  })
    .populate({
      path: "subcategory",
      populate: { path: "category", select: "name" },
    })
    .limit(lim)
    .skip(skip);

  const totalCounts = await Exercise.countDocuments();
  const totalPages = Math.ceil(totalCounts / lim);
  const currentPage = pg;

  return { exercises, totalCounts, totalPages, currentPage };
};

export const getExerciseById = async (exerciseId) => {
  const exercise = await Exercise.findById(exerciseId).populate({
    path: "subcategory",
    populate: { path: "category" },
  });
  return exercise;
};

export const getExercisesBySubcategory = async (subcategoryId) => {
  const exercises = await Exercise.find({ subcategory: subcategoryId }).populate({
    path: "subcategory",
    populate: { path: "category" },
  });
  return exercises;
};

export const createExercise = async (exerciseData, exerciseImage) => {
  const {
    subcategory,
    name,
    sets,
    duration,
    instructions,
    focusArea,
    videoUrl,
    metValue,
  } = exerciseData;

  const parsedfocusArea = typeof focusArea === "string" ? JSON.parse(focusArea) : focusArea;

  const exercise = new Exercise({
    subcategory,
    name,
    sets,
    duration,
    instructions,
    focusArea: parsedfocusArea,
    videoUrl,
    metValue,
    image: exerciseImage,
  });
  await exercise.save();
  return exercise;
};

