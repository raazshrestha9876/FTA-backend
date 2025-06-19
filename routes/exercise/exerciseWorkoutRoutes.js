import {
  stopWorkout,
  startWorkout,
  getTotalCalories,
} from "../../controllers/exercise/exerciseWorkoutController.js";
import express from "express";
import { protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get-total-calories", protect, getTotalCalories);
router.post("/start", protect, startWorkout);
router.post("/stop/:id", protect, stopWorkout);

export default router;
