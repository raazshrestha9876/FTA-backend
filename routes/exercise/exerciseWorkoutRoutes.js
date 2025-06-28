import {
  stopWorkout,
  startWorkout,
  userCaloriesStatsAnalytics,
  totalCaloriesBurnedAllUserStats,
  userWorkoutHistory,
} from "../../controllers/exercise/exerciseWorkoutController.js";
import express from "express";
import { protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get-total-user-calories", protect,  userCaloriesStatsAnalytics);
router.get("/get-total-all-user-calories", totalCaloriesBurnedAllUserStats);
router.get("/user-workout-history", protect, userWorkoutHistory);
router.post("/start", protect, startWorkout);
router.post("/stop/:id", protect, stopWorkout);


export default router;
