import Conversation from '../models/conversationModel.js';

/**
 * Finds a conversation between the logged-in user and another user.
 * If a conversation doesn't exist, it creates a new one.
 */
export const findOrCreateConversation = async (req, res) => {
    const currentUserId = req.user.id;
    const { otherUserId } = req.body;

    if (!otherUserId) {
        return res.status(400).json({ message: 'Other user ID is required.' });
    }

    try {
        // Check if a conversation already exists
        let conversation = await Conversation.findPrivateConversation(currentUserId, otherUserId);
        
        if (conversation) {
            // Conversation exists, return its ID
            res.status(200).json({ conversationId: conversation.conversation_id, message: 'Conversation already exists.' });
        } else {
            // Create a new conversation
            const newConversation = await Conversation.create(currentUserId, otherUserId);
            res.status(201).json({ conversationId: newConversation.id, message: 'Conversation created.' });
        }

    } catch (error) {
        console.error('Error finding or creating conversation:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};
