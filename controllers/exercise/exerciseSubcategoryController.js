import ExerciseCategory from "../../models/exercise/ExerciseCategory.js";
import ExerciseWorkout from "../../models/exercise/ExerciseWorkout.js";
import * as subcategoryService from "../../services/exercise/exerciseSubcategoryService.js";

export const getAllSubcategories = async (req, res) => {
  try {
    const Subcategories = await subcategoryService.getAllSubcategories();
    res.status(200).json(Subcategories);
  } catch (error) {
    res.status(500).json({ message: "Failed to get all Subcategory" });
  }
};

export const getSubcategoryByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const Subcategory = await subcategoryService.getSubcategoryByCategory(
      category
    );
    if (!Subcategory) {
      return res
        .status(404)
        .json({ message: "No Subcategory found for this category" });
    }
    res.status(200).json(Subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSubcategory = async (req, res) => {
  try {
    const { category, dayNumber, name, description } = req.body;
    const categoryExists = await ExerciseCategory.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }
    const subcategory = await subcategoryService.createSubcategory({
      category,
      dayNumber,
      name,
      description,
    });
    res.status(201).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const getUserSubcategoriesByCategory = async (req, res) => {
//   try {
//     const userId = req.user;
//     const { categoryId } = req.params;

//     const workouts = await ExerciseWorkout.find({ user: userId }).populate({
//       path: "exercise",
//       populate: {
//         path: "subcategory",
//         model: "ExerciseSubcategory",
//       },
//     });

//     const matchedSubcategories = workouts
//       .map((workout) => workout.exercise?.subcategory)
//       .filter((sub) => sub.category.toString() === categoryId.toString());

//     const uniqueSubcategoriesMap = {};
//     matchedSubcategories.forEach((subcategory) => {
//       uniqueSubcategoriesMap[subcategory._id] = subcategory;
//     });
//     const uniqueSubcategories = Object.values(uniqueSubcategoriesMap);
//     res.status(200).json(uniqueSubcategories);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
