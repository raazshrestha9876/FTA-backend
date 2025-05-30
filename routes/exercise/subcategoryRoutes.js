import express from "express";
import { createSubcategory, getAllSubcategories, getSubcategoryByCategory } from "../../controllers/exercise/SubcategoryController.js";
import { validate } from "../../middlewares/validate.js";
import { subcategoryValidator } from "../../validators/exerciseValidator.js";


const router = express.Router();

router.get('/', getAllSubcategories);
router.get('/:category', getSubcategoryByCategory);
router.post("/", subcategoryValidator, validate, createSubcategory);

export default router;
