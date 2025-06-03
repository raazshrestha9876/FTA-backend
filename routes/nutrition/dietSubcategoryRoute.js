import express from "express";

import upload from "../../middlewares/multer.js";
import { getDietSubcategory, createDietSubcategory, getDietSubcategoryByCategory } from "../../controllers/nutrition/dietSubcategoryController.js";

const router = express.Router();

router.post("/add", createDietSubcategory);
router.get("/list", getDietSubcategory);
router.get("/:category", getDietSubcategoryByCategory)

export default router;
