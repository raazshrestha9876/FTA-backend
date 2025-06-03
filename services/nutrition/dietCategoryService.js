import DietCategory from "../../models/nutrition/DietCategory.js";

export const createDietCategory = async (categoryData, categoryImage) => {
  const { name, description } = categoryData;

  const dietCategory = new DietCategory({
    name,
    description,
    image: categoryImage,
  });
  await dietCategory.save();
  return dietCategory;
};

export const getDietCategory = async () => {
  const dietCategories = await DietCategory.find();
  return dietCategories;
};
