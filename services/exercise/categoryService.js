import Category from "../../models/exercise/Category.js";

export const getAllCategories = async () => {
  const categories = await Category.find();
  return categories;
};

export const createCategory = async (name, image) => {
  
  const category = new Category({
    name,
    image,
  });
  await category.save();
  return category;
};
