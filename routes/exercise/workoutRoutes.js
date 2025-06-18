import { stopWorkout, startWorkout } from "../../controllers/exercise/workoutController.js";
import express from "express";
import { protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Define routes for workout
router.post("/start", protect, startWorkout);
router.post("/stop/:workoutId",protect, stopWorkout);

export default router;