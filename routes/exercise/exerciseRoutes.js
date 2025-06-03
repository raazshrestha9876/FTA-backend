import express from "express";
import {
  createExercise,
  getAllExercises,
  getExerciseById,
} from "../../controllers/exercise/exerciseController.js";
import upload from "../../middlewares/multer.js";
// import { validate } from '../../middlewares/validate.js';
// import { exerciseValidator } from '../../validators/exerciseValidator.js';

const router = express.Router();

// Define routes for exercise
router.get("/list", getAllExercises);
// router.get('/day/:dayId',  getExercisesByDay);
router.get('/:exerciseId', getExerciseById);
router.post("/add", upload.single("image"), createExercise);
// router.put('/:exerciseId', updateExerciseValidator, validate, updateExercise);
// router.delete('/:exerciseId', deleteExercise);

export default router;
