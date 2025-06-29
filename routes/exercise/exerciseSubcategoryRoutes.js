import express from "express";
import {
  createSubcategory,
  getAllSubcategories,
  getSubcategoryByCategory,
  getUserSubcategoriesByCategory,
} from "../../controllers/exercise/exerciseSubcategoryController.js";
import { authorizeRoles, protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/list", protect, authorizeRoles('admin'), getAllSubcategories);
router.get("/:category", getSubcategoryByCategory);
router.post("/add", protect, authorizeRoles('admin'), createSubcategory);
// router.get("/user-subcategories/:categoryId", protect, getUserSubcategoriesByCategory);

export default router;
