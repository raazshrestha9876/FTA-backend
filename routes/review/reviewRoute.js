import express from 'express'
import { addReview, getReviews } from '../../controllers/review/reviewController.js';
import { authorizeRoles, protect } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, authorizeRoles('user'), addReview);
router.get('/get', protect, authorizeRoles('admin', 'user'), getReviews);

export default router;