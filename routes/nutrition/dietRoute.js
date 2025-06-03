import express from 'express';
import { createDiet, getAllDiet, getDietById } from '../../controllers/nutrition/dietController.js';
import upload from '../../middlewares/multer.js';

const router = express.Router();

router.post('/add', upload.single('image'), createDiet);
router.get('/list', getAllDiet);
router.get('/:id', getDietById );

export default router;
