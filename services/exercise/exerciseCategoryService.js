import ExerciseCategory from "../../models/exercise/ExerciseCategory.js";

export const getAllCategories = async () => {
  const categories = await ExerciseCategory.find();
  return categories;
};

export const createCategory = async (name, image) => {
  const category = new ExerciseCategory({
    name,
    image,
  });
  await category.save();
  return category;
};
