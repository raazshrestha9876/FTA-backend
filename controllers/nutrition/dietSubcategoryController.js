import * as dietSubcategoryService from "../../services/nutrition/dietSubcategoryService.js";

export const createDietSubcategory = async (req, res) => {
  try {
    const dietSubcategory = await dietSubcategoryService.createDietSubcategory(
      req.body
    );
    res.status(201).json(dietSubcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getDietSubcategory = async (req, res) => {
  try {
    const dietSubcategories = await dietSubcategoryService.getDietSubcategory();
    console.log(dietSubcategories);
    res.status(200).json(dietSubcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDietSubcategoryByCategory = async (req, res) => {
  try {
    const dietSubcategory = await dietSubcategoryService.getDietSubcategoryByCategory(
      req.params.category
    );
    res.status(200).json(dietSubcategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
