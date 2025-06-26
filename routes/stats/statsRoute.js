import express from "express";
import { adminCardStats } from "../../controllers/stats/statsController.js";


const router = express.Router();

router.get("/get-admin-card-stats", adminCardStats);

export default router;
