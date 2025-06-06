import * as dietService from "../../services/nutrition/dietService.js";

export const createDiet = async (req, res) => {
  try {
    const diet = await dietService.createDiet(req.body, req.file.filename);
    res.status(201).json(diet);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};
export const getAllDiet = async (req, res) => {
  try {
    const { diets, totalCounts, totalPages, currentPage } =
      await dietService.getAllDiet(
        req.query.page || 1,
        req.query.limit || 10,
        req.query.searchTerm || ""
      );
    res.status(200).json({
      data: diets,
      totalCounts: totalCounts,
      totalPages: totalPages,
      currentPage: currentPage,
    });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};
export const getDietById = async (req, res) => {
  try {
    const diet = await dietService.getDietById(req.params.id);
    res.status(200).json(diet);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

export const getDietBySubcategory = async (req, res) => {
  try {
    const diets = await dietService.getDietBySubcategory(req.params.subcategoryId);
    res.status(200).json(diets);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
}

