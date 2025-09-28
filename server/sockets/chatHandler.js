// This map will store which user ID belongs to which socket ID
const userSocketMap = new Map();

export default function chatHandler(io) {
    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId; // Assume userId is passed in handshake
        if(userId) {
            console.log(`User ${userId} connected with socket ID: ${socket.id}`);
            userSocketMap.set(userId, socket.id);
        }

        // --- Message Handling ---
        socket.on('sendMessage', ({ recipientId, messageText }) => {
            const recipientSocketId = userSocketMap.get(recipientId);

            if (recipientSocketId) {
                // Send the message to the specific recipient
                io.to(recipientSocketId).emit('receiveMessage', {
                    text: messageText,
                    senderId: userId,
                });
                console.log(`Message sent from ${userId} to ${recipientId}`);
            } else {
                // Handle offline users - maybe save to DB as 'unread'
                console.log(`User ${recipientId} is offline.`);
            }
        });

        // --- WebRTC Signaling Handling ---
        socket.on('signal', ({ to, type, payload }) => {
            const recipientSocketId = userSocketMap.get(to);
            if(recipientSocketId) {
                io.to(recipientSocketId).emit('signal', {
                    from: userId,
                    type,
                    payload
                });
            }
        });

        // --- Disconnect Handling ---
        socket.on('disconnect', () => {
            if (userId) {
                console.log(`User ${userId} disconnected.`);
                userSocketMap.delete(userId);
            }
        });
    });
}
