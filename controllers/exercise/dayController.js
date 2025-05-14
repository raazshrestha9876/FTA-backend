import * as dayService from "../../services/exercise/dayService.js";
import * as categoryService from "../../services/exercise/categoryService.js";

export const getAllDays = async (req, res) => {
  try {
    const days = await dayService.getAllDays();
    res.status(200).json(days);
  } catch (error) {
    res.status(500).json({ message: "Failed to get all days" });
  }
};

export const getDaysByCategory = async (req, res) => {
  try{
    const { categoryId } = req.params;
    const days = await dayService.getDaysByCategory(categoryId);
    if (!days) {
      return res.status(404).json({ message: "No days found for this category" });
    }
    res.status(200).json(days);
  }catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDay = async (req, res) => {
  try {
    const { category, dayNumber, muscleType } = req.body;
    const categoryExists = await categoryService.getCategoryById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }
    const day = await dayService.createDay({ category, dayNumber, muscleType });
    res.status(201).json(day);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
