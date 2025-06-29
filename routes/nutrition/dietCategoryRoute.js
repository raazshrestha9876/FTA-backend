import express from 'express';
import { createDietCategory, getDietCategory } from '../../controllers/nutrition/dietCategoryController.js';
import upload from '../../middlewares/multer.js';
import { authorizeRoles, protect } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, authorizeRoles('admin'), upload.single('image'), createDietCategory);
router.get('/list', getDietCategory);

export default router;