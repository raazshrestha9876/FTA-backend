import express from 'express';
import { createDietCategory, getDietCategory } from '../../controllers/nutrition/dietCategoryController.js';
import upload from '../../middlewares/multer.js';

const router = express.Router();

router.post('/add', upload.single('image'), createDietCategory);
router.get('/list', getDietCategory);

export default router;