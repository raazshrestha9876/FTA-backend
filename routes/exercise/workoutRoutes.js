import {
  stopWorkout,
  startWorkout,
  getTotalCalories,
} from "../../controllers/exercise/workoutController.js";
import express from "express";
import { protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Define routes for workout
router.get("/get-total-calories", protect, getTotalCalories);
router.post("/start", protect, startWorkout);
router.post("/stop/:id", protect, stopWorkout);

export default router;
