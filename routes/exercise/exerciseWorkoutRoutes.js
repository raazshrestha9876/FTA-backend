import {
  stopWorkout,
  startWorkout,
  userCaloriesStatsAnalytics,
  totalCaloriesBurnedAllUserStats,
  userWorkoutHistory,
} from "../../controllers/exercise/exerciseWorkoutController.js";
import express from "express";
import { authorizeRoles, protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/user-workout-history", protect, authorizeRoles('user'), userWorkoutHistory);
router.post("/start", protect, authorizeRoles('user'), startWorkout);
router.post("/stop/:id", protect, authorizeRoles('user'), stopWorkout);


export default router;
