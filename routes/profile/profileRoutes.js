import express from 'express';
import { getUserProfile, updateUserProfile, deleteUserProfile } from '../controllers/profileController.js';


const router = express.Router();

router.get('/:userId',  getUserProfile);
router.put('/:userId', updateUserProfile);
router.delete('/:userId', deleteUserProfile);

export default router;