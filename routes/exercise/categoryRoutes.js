import express from "express";
import {
  getAllCategories,
  createCategory,
} from "../../controllers/exercise/categoryController.js";
import { validate } from "../../middlewares/validate.js";
import { categoryValidator } from "../../validators/exerciseValidator.js";
import upload from "../../middlewares/multer.js";


const router = express.Router();

router.get("/", getAllCategories);
router.post(
  "/",
  categoryValidator,
  validate,
  upload.single("image"),
  createCategory
);

export default router;
