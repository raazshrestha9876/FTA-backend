import express from "express";
import { protect } from "../../middlewares/authMiddleware.js";
import { setGoalForStepCounter, setStepCounterStats } from "../../controllers/exercise/stepCounterController.js";



const router = express.Router();

router.post('/add-goal', protect, setGoalForStepCounter);
router.post('/add-counter-stats', protect, setStepCounterStats );

export default router;
