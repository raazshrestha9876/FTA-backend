import ExerciseSubcategory from '../../models/exercise/ExerciseSubcategory.js';


export const getAllSubcategories = async () => {
    const subcategories = await ExerciseSubcategory.find().populate({'path': 'category'});
    return subcategories;
}
export const getSubcategoryByCategory = async (category) => {
    const subcategory = await ExerciseSubcategory.find({category: category});
    return subcategory;
}
export const createSubcategory = async (subCategoryData) => {
    const { category, dayNumber, name, description } = subCategoryData;
    const subcategory = new ExerciseSubcategory({ category, dayNumber, name, description });
    await subcategory.save();
    return subcategory;
}