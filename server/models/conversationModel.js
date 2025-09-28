import db from '../config/db.js';

const Conversation = {
    /**
     * Finds an existing private conversation between two users.
     * @param {number} userId1
     * @param {number} userId2
     * @returns {Promise<object|undefined>}
     */
    async findPrivateConversation(userId1, userId2) {
        const query = `
            SELECT p1.conversation_id
            FROM participants p1
            JOIN participants p2 ON p1.conversation_id = p2.conversation_id
            WHERE p1.user_id = ? AND p2.user_id = ?;
        `;
        const [rows] = await db.query(query, [userId1, userId2]);
        return rows[0];
    },

    /**
     * Creates a new conversation and adds two users as participants.
     * @param {number} userId1
     * @param {number} userId2
     * @returns {Promise<object>} The new conversation object with its ID.
     */
    async create(userId1, userId2) {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            const [result] = await connection.query('INSERT INTO conversations () VALUES ()');
            const conversationId = result.insertId;

            const participantsQuery = 'INSERT INTO participants (user_id, conversation_id) VALUES (?, ?), (?, ?)';
            await connection.query(participantsQuery, [userId1, conversationId, userId2, conversationId]);

            await connection.commit();
            return { id: conversationId };
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
};

export default Conversation;
