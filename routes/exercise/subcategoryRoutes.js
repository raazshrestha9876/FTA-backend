import express from "express";
import { createSubcategory, getAllSubcategories, getSubcategoryByCategory } from "../../controllers/exercise/SubcategoryController.js";
import upload from "../../middlewares/multer.js";


const router = express.Router();

router.get('/list', getAllSubcategories);
router.get('/:category', getSubcategoryByCategory);
router.post("/add", upload.single('image'), createSubcategory);

export default router;
