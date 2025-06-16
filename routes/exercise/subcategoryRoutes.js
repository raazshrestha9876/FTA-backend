import express from "express";
import {
  createSubcategory,
  getAllSubcategories,
  getSubcategoryByCategory,
} from "../../controllers/exercise/SubcategoryController.js";
import upload from "../../middlewares/multer.js";
import { authorizeRoles, protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/list", getAllSubcategories);
router.get("/:category", getSubcategoryByCategory);
router.post("/add", protect, authorizeRoles("admin"), createSubcategory);

export default router;
