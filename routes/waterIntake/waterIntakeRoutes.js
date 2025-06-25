import express from "express";
import { protect } from "../../middlewares/authMiddleware.js";
import { addWaterIntake, getWaterIntakeLog } from "../../controllers/exercise/waterIntakeController.js";

const router = express.Router();

router.post("/add-water-intake", protect, addWaterIntake);
router.get("/get-water-intake-log", protect, getWaterIntakeLog);

export default router;
