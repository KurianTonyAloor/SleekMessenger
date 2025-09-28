import express from 'express';
import { searchUsers } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Defines the GET /api/users/search endpoint
// The 'protect' middleware ensures only authenticated users can access this route.
router.get('/search', protect, searchUsers);

export default router;
