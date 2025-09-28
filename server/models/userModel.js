import db from '../config/db.js';
import bcrypt from 'bcryptjs';

const User = {
    /**
     * Finds a user by their email address.
     * @param {string} email - The email of the user to find.
     * @returns {Promise<object|undefined>}
     */
    async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.query(query, [email]);
        return rows[0];
    },

    /**
     * Creates a new user in the database.
     * @param {string} username
     * @param {string} email
     * @param {string} password
     * @returns {Promise<object>}
     */
    async create(username, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const [result] = await db.query(query, [username, email, hashedPassword]);
        return { id: result.insertId, username, email };
    },

    /**
     * Searches for users by username, excluding the current user.
     * @param {string} username - The partial username to search for.
     * @param {number} currentUserId - The ID of the user performing the search.
     * @returns {Promise<Array>}
     */
    async searchByUsername(username, currentUserId) {
        const query = `
            SELECT id, username FROM users 
            WHERE username LIKE ? AND id != ? 
            LIMIT 10;
        `;
        // Using '%' allows for partial matches
        const [rows] = await db.query(query, [`%${username}%`, currentUserId]);
        return rows;
    }
};

export default User;

