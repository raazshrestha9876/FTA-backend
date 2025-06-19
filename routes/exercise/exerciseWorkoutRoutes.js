import {
  stopWorkout,
  startWorkout,
  userCaloriesStatsAnalytics,
  totalCaloriesBurnedAllUserStats,
} from "../../controllers/exercise/exerciseWorkoutController.js";
import express from "express";
import { protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get-total-user-calories", protect,  userCaloriesStatsAnalytics);
router.get("/get-total-all-user-calories", totalCaloriesBurnedAllUserStats);
router.post("/start", protect, startWorkout);
router.post("/stop/:id", protect, stopWorkout);


export default router;
