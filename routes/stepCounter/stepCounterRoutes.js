import express from "express";
import { protect } from "../../middlewares/authMiddleware.js";
import { setGoalForStepCounter } from "../../controllers/exercise/stepCounterController.js";



const router = express.Router();

router.post('/add', protect, setGoalForStepCounter);


export default router;
