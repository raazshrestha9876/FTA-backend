import express from "express";
import { authorizeRoles, protect } from "../../middlewares/authMiddleware.js";
import {
  getGoalForStepCounter,
  getStepCounterStats,
  setGoalForStepCounter,
  setStepCounterStats,
} from "../../controllers/exercise/stepCounterController.js";

const router = express.Router();

router.post("/add-goal", protect, authorizeRoles('user'), setGoalForStepCounter);
router.get("/get-goal", protect, authorizeRoles('user'), getGoalForStepCounter);
router.post("/add-counter-stats", protect, authorizeRoles('user'), setStepCounterStats);
router.get("/get-counter-stats", protect, authorizeRoles('user'), getStepCounterStats);

export default router;
