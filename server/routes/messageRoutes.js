import express from 'express';
import { getMessages } from '../controllers/messageController.js';

const router = express.Router();

// A middleware to protect routes would go here in a real app
// import authMiddleware from '../middleware/authMiddleware.js';

// @route   GET /api/messages/:conversationId
// @desc    Get all messages for a conversation
router.get('/:conversationId', getMessages);

export default router;
