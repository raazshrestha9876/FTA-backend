import express from 'express';
import { createDiet, getAllDiet, getDietById , getDietBySubcategory } from '../../controllers/nutrition/dietController.js';
import upload from '../../middlewares/multer.js';
import { authorizeRoles, protect } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, authorizeRoles('admin'), upload.single('image'), createDiet);
router.get('/list', protect,authorizeRoles('admin'), getAllDiet);
router.get('/:dietId', protect, authorizeRoles('admin', 'user'), getDietById );
router.get('/subcategory/:subcategoryId', getDietBySubcategory);

export default router;
