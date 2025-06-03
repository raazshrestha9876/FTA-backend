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
    const diet = await dietService.getAllDiet();
    res.status(200).json(diet);
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
