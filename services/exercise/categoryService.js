import Category from '../models/exercise/Category.js';

export const getAllCategories = async () => {
   const categories = await Category.find();
    return categories;
}

export const createCategory = async (categoryData ) => {
    const { name } = categoryData;
    const category = new Category({ name });
    await category.save();
    return category;
}