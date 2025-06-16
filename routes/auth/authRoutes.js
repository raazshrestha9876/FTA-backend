import express from 'express';
import { register, login, getUser, } from '../../controllers/auth/authController.js';
// import { validate } from '../../middlewares/validate.js';
// import { registerValidator, loginValidator } from '../../validators/authValidator.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/get-user', getUser);
// router.post('/forget-password', forgetPassword);
// router.post('/reset-password/:token', resetPassword);

export default router;