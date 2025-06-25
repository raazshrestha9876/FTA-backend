import express from "express";
import { protect } from "../../middlewares/authMiddleware.js";
import {
  getGoalForStepCounter,
  getStepCounterStats,
  setGoalForStepCounter,
  setStepCounterStats,
} from "../../controllers/exercise/stepCounterController.js";

const router = express.Router();

router.post("/add-goal", protect, setGoalForStepCounter);
router.get("/get-goal", protect, getGoalForStepCounter);
router.post("/add-counter-stats", protect, setStepCounterStats);
router.get("/get-counter-stats", protect, getStepCounterStats);

export default router;
