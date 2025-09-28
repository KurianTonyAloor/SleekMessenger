import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Log in a user
router.post('/login', login);

export default router;
