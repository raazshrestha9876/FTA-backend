import express from 'express';
import { register, login, getUser, updateUser, updateUserImage, } from '../../controllers/auth/authController.js';
import { protect } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/get-user',protect, getUser);
router.post('/update-user',protect, updateUser)
router.post('/update-user-image',protect, updateUserImage)


export default router;