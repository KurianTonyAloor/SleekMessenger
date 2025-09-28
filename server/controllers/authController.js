import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide all fields.' });
    }

    try {
        const existingUser = await userModel.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists.' });
        }

        const result = await userModel.create(username, email, password);
        res.status(201).json({ message: 'User registered successfully!', userId: result.insertId });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password.' });
    }
    
    try {
        const user = await userModel.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Create and sign a JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        res.status(200).json({
            message: 'Login successful!',
            token,
            user: { id: user.id, username: user.username }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
};
