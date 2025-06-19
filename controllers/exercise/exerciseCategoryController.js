import * as categoryService from "../../services/exercise/exerciseCategoryService.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file.filename;
    const category = await categoryService.createCategory(name, image);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
