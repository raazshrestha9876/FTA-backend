import express from "express";
import { authorizeRoles, protect } from "../../middlewares/authMiddleware.js";
import { addWaterIntake, getWaterIntakeLog } from "../../controllers/exercise/waterIntakeController.js";

const router = express.Router();

router.post("/add", protect, authorizeRoles('user'), addWaterIntake);
router.get("/get-log", protect, authorizeRoles('user'), getWaterIntakeLog);

export default router;
