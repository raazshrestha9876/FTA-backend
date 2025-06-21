import express from "express";
import { protect } from "../../middlewares/authMiddleware.js";
import {
  getStepCounterStats,
  setGoalForStepCounter,
  setStepCounterStats,
} from "../../controllers/exercise/stepCounterController.js";

const router = express.Router();

router.post("/add-goal", protect, setGoalForStepCounter);
router.post("/add-counter-stats", protect, setStepCounterStats);
router.get("/get-counter-stats", protect, getStepCounterStats);

export default router;
