import express from "express";
import {
  createSubcategory,
  getAllSubcategories,
  getSubcategoryByCategory,
  getUserSubcategoriesByCategory,
} from "../../controllers/exercise/exerciseSubcategoryController.js";
import { protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/list", getAllSubcategories);
router.get("/:category", getSubcategoryByCategory);
router.post("/add", createSubcategory);
router.get("/user-subcategories/:categoryId", protect, getUserSubcategoriesByCategory);

export default router;
