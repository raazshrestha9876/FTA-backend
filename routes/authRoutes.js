import express from 'express';
import { register, login, forgetPassword, resetPassword } from '../controllers/authController';
import { validate } from '../middlewares/validate';
import { registerValidator, loginValidator } from '../validators/authValidator';

const router = express.Router();

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.post('/forget-password',validate, forgetPassword);
router.post('/reset-password/:token', validate, resetPassword);

export default router;