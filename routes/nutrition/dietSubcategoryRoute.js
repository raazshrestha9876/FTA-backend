import express from "express";

import {
  getDietSubcategory,
  createDietSubcategory,
  getDietSubcategoryByCategory,
} from "../../controllers/nutrition/dietSubcategoryController.js";
import { authorizeRoles, protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, authorizeRoles("admin"), createDietSubcategory);
router.get("/list", protect, authorizeRoles("admin"), getDietSubcategory);
router.get("/:category", getDietSubcategoryByCategory);

export default router;
