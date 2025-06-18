import { stopWorkout, startWorkout } from "../../controllers/exercise/workoutController.js";
import express from "express";

const router = express.Router();

// Define routes for workout
router.post("/start", startWorkout);
router.post("/stop/:workoutId", stopWorkout);

export default router;