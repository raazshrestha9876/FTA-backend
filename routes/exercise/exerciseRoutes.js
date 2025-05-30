import express from 'express';
import {createExercise } from '../../controllers/exercise/exerciseController.js';
// import { validate } from '../../middlewares/validate.js';
// import { exerciseValidator } from '../../validators/exerciseValidator.js';

const router = express.Router();

// Define routes for exercise
// router.get('/', getAllExercises);
// router.get('/day/:dayId',  getExercisesByDay); 
// router.get('/:exerciseId', getExerciseById);
router.post('/',  createExercise);
// router.put('/:exerciseId', updateExerciseValidator, validate, updateExercise);
// router.delete('/:exerciseId', deleteExercise);

export default router;