import * as dietCategoryService from "../../services/nutrition/dietCategoryService.js";

export const createDietCategory = async (req, res) => {
  try {
    const dietCategory = await dietCategoryService.createDietCategory(
      req.body,
      req.file.filename
    );
    res.status(201).json(dietCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDietCategory = async (req, res) => {
  try {
    const dietCategory = await dietCategoryService.getDietCategory();
    res.status(200).json(dietCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
