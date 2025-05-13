import express from 'express';
import { getUserProfile, updateUserProfile, deleteUserProfile } from '../controllers/profileController';
import { validate } from '../middlewares/validate';
import { updateProfileValidator } from '../validators/profileValidator';


const router = express.Router();

// Route to get user profile
router.get('/:userId', updateProfileValidator, validate, getUserProfile);
router.put('/:userId', validate, updateUserProfile);
router.delete('/:userId', validate, deleteUserProfile);

export default router;