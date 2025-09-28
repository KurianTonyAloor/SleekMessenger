import ui from './ui.js';
import api from './api.js';
import socketService from './socket.js';

// --- Theme Switching Logic ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

/**
 * Applies the theme saved in localStorage or defaults to dark mode.
 */
const applySavedTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark
    body.setAttribute('data-theme', savedTheme);
    // Sync the toggle switch state with the current theme
    themeToggle.checked = savedTheme === 'light';
};

/**
 * Handles the theme change event when the toggle is clicked.
 */
const handleThemeChange = () => {
    if (themeToggle.checked) {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
};

// Add event listener for the toggle switch
themeToggle.addEventListener('change', handleThemeChange);

// --- Main App Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Apply the user's preferred theme as soon as the page loads
    applySavedTheme();

    const messageForm = document.querySelector('.chat-input-form');
    const messageInput = document.getElementById('messageInput');

    if (messageForm) {
        messageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const messageText = messageInput.value.trim();
            if (messageText) {
                // In a real app, recipientId would be dynamic based on the selected contact
                const recipientId = 'user456'; 
                socketService.sendMessage(recipientId, messageText);
                
                // Display the sent message immediately on the UI for a snappy feel
                ui.addMessage(messageText, 'sent');
                messageInput.value = '';
            }
        });
    }

    // Listen for incoming messages from the socket service
    socketService.onMessageReceived((message) => {
        // A check to ensure the message is from the currently active chat would be ideal here
        ui.addMessage(message.text, 'received');
    });

    // Connect to the socket server
    // In a real app, the userId would be retrieved after a successful login
    const userId = 'user123'; 
    socketService.connect(userId);
});

