import express from 'express';
import {getAllDays, getDaysByCategory, createDay } from '../../controllers/exercise/dayController';
import { validate } from '../../middlewares/validate.js';
import { daysValidator } from '../../validators/exerciseValidator.js';

const router = express.Router();

router.get('/', getAllDays);
router.get('/:categoryId/days', getDaysByCategory);
router.post('/', daysValidator, validate, createDay);

export default router;