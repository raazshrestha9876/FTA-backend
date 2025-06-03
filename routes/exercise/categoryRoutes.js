import express from "express";
import {
  getAllCategories,
  createCategory,
} from "../../controllers/exercise/categoryController.js";
import upload from "../../middlewares/multer.js";


const router = express.Router();

router.get("/list", getAllCategories);
router.post("/add", upload.single("image"), createCategory);

export default router;
