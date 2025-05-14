import express from 'express';
import { register, login, forgetPassword, resetPassword } from '../controllers/authController.js';
import { validate } from '../middlewares/validate.js';
import { registerValidator, loginValidator } from '../validators/authValidator.js';

const router = express.Router();

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.post('/forget-password', forgetPassword);
router.post('/reset-password/:token', resetPassword);

export default router;