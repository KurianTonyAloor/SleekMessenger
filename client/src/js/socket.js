import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

// This URL should point to your backend server.
const SOCKET_URL = 'http://localhost:3000';
let socket;

const socketService = {
    /**
     * Connects to the Socket.io server with authentication.
     */
    connect: () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error("Authentication token not found. Cannot connect socket.");
            // Redirect to login page
            window.location.href = '/login.html';
            return;
        }

        // The 'auth' option is used to send credentials to the server upon connection.
        socket = io(SOCKET_URL, {
            auth: {
                token: `Bearer ${token}`
            }
        });

        socket.on('connect', () => {
            console.log('Socket connected successfully:', socket.id);
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected.');
        });

        socket.on('connect_error', (err) => {
            console.error('Socket connection error:', err.message);
        });
    },

    /**
     * Disconnects from the socket server.
     */
    disconnect: () => {
        if (socket) {
            socket.disconnect();
        }
    },

    /**
     * Emits a 'sendMessage' event to the server.
     * @param {object} messageData - { recipientId, messageText }
     */
    sendMessage: (messageData) => {
        if (socket) {
            socket.emit('sendMessage', messageData);
        }
    },

    /**
     * Listens for incoming 'receiveMessage' events.
     * @param {function} callback - The function to execute with the message data.
     */
    onReceiveMessage: (callback) => {
        if (socket) {
            socket.on('receiveMessage', callback);
        }
    },

    // --- WebRTC Signaling ---
    
    /**
     * Emits a WebRTC signaling event.
     * @param {object} data - { to, type, payload }
     */
    emitSignal: (data) => {
        if(socket) {
            socket.emit('signal', data);
        }
    },

    /**
     * Listens for incoming WebRTC signaling events.
     * @param {function} callback 
     */
    onSignal: (callback) => {
        if (socket) {
            socket.on('signal', callback);
        }
    }
};

export default socketService;
