import express from "express";
import {
  createSubcategory,
  getAllSubcategories,
  getSubcategoryByCategory,
} from "../../controllers/exercise/exerciseSubcategoryController.js";

const router = express.Router();

router.get("/list", getAllSubcategories);
router.get("/:category", getSubcategoryByCategory);
router.post("/add", createSubcategory);

export default router;
