import DietSubcategory from "../../models/nutrition/DietSubcategory.js";

export const createDietSubcategory = async (subcategoryData) => {
  const { name, category } = subcategoryData;
  const dietSubcategory = new DietSubcategory({
    name,
    category,
  });

  await dietSubcategory.save();

  return dietSubcategory;
};
export const getDietSubcategory = async () => {
  const dietSubcategories = await DietSubcategory.find().populate(
    "category",
    "name"
  );
  return dietSubcategories;
};

export const getDietSubcategoryByCategory = async (categoryId) => {
  const dietSubcategories = await DietSubcategory.find({
    category: categoryId,
  });
  return dietSubcategories;
};
