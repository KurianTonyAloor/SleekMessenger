import User from '../models/userModel.js';

/**
 * Searches for users based on a username query.
 */
export const searchUsers = async (req, res) => {
    try {
        const { username } = req.query;
        const currentUserId = req.user.id; // From auth middleware

        if (!username) {
            return res.status(400).json({ message: 'Username query is required' });
        }

        const users = await User.searchByUsername(username, currentUserId);
        res.status(200).json(users);

    } catch (error) {
        console.error('User search error:', error);
        res.status(500).json({ message: 'Server error during user search' });
    }
};
