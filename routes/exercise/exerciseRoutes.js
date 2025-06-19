import express from "express";
import {
  createExercise,
  getAllExercises,
  getExerciseById,
  getExercisesBySubcategory,
} from "../../controllers/exercise/exerciseController.js";
import upload from "../../middlewares/multer.js";

const router = express.Router();

router.get("/list", getAllExercises);
router.get("/subcategory/:subcategoryId", getExercisesBySubcategory);
router.get("/:exerciseId", getExerciseById);
router.post("/add", upload.single("image"), createExercise);

export default router;
