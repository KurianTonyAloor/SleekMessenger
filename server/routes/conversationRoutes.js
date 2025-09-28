import express from 'express';
import { findOrCreateConversation } from '../controllers/conversationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Defines the POST /api/conversations endpoint
router.post('/', protect, findOrCreateConversation);

export default router;
