import express from "express";
import { adminCardStats, totalCaloriesBurnedAllUserStats, userCaloriesStatsAnalytics } from "../../controllers/stats/statsController.js";
import { authorizeRoles, protect } from "../../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/get-admin-card-stats", protect, authorizeRoles('admin'), adminCardStats);
router.get("/get-total-user-calories", protect, authorizeRoles('user'),  userCaloriesStatsAnalytics);
router.get("/get-total-all-user-calories", protect, authorizeRoles('admin'), totalCaloriesBurnedAllUserStats);

export default router;
