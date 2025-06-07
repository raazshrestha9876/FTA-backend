import Subcategory from '../../models/exercise/SubCategory.js';

export const getAllSubcategories = async () => {
    const subcategories = await Subcategory.find().populate({'path': 'category'});
    return subcategories;
}
export const getSubcategoryByCategory = async (category) => {
    const subcategory = await Subcategory.find({category: category});
    return subcategory;
}
export const createSubcategory = async (subCategoryData) => {
    const { category, dayNumber, name, description } = subCategoryData;
    const subcategory = new Subcategory({ category, dayNumber, name, description });
    await subcategory.save();
    return subcategory;
}