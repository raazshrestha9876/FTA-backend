import express from 'express';
import { getUserProfile, updateUserProfile, deleteUserProfile } from '../controllers/profileController.js';
import { validate } from '../../middlewares/validate.js';
import { updateProfileValidator } from '../../validators/profileValidator.js';

const router = express.Router();

// Route to get user profile
router.get('/:userId', updateProfileValidator, validate, getUserProfile);
router.put('/:userId', updateUserProfile);
router.delete('/:userId', deleteUserProfile);

export default router;