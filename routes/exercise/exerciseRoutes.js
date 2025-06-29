import express from "express";
import {
  createExercise,
  getAllExercises,
  getExerciseById,
  getExercisesBySubcategory,
} from "../../controllers/exercise/exerciseController.js";
import upload from "../../middlewares/multer.js";
import { authorizeRoles, protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/list", protect, authorizeRoles('admin'), getAllExercises);
router.get("/subcategory/:subcategoryId", getExercisesBySubcategory);
router.get("/:exerciseId", protect, authorizeRoles('admin', 'user'), getExerciseById);
router.post("/add",protect, authorizeRoles('admin'), upload.single("image"), createExercise);

export default router;
