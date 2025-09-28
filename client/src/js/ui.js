const messageList = document.querySelector('.message-list');
const messageInput = document.getElementById('messageInput');

const ui = {
    /**
     * Adds a message to the chat window and applies animations.
     * @param {object} message - { text, senderId, type }
     * @param {string} currentUserId - The ID of the currently logged-in user.
     */
    addMessage: (message, currentUserId) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'new-message'); // new-message triggers animation

        // Determine if the message was sent or received
        const messageType = message.senderId === currentUserId ? 'sent' : 'received';
        messageDiv.classList.add(messageType);
        
        messageDiv.textContent = message.text;

        messageList.appendChild(messageDiv);

        // Scroll to the bottom to see the new message
        messageList.scrollTop = messageList.scrollHeight;
    },

    /**
     * Clears the message input field.
     */
    clearMessageInput: () => {
        if (messageInput) {
            messageInput.value = '';
        }
    },
    
    /**
     * Displays a typing indicator in the chat.
     * @param {boolean} isVisible - Whether to show or hide the indicator.
     */
    showTypingIndicator: (isVisible) => {
        let indicator = document.querySelector('.typing-indicator');
        if (isVisible && !indicator) {
            indicator = document.createElement('div');
            indicator.classList.add('typing-indicator', 'message', 'received');
            indicator.innerHTML = '<span></span><span></span><span></span>';
            messageList.appendChild(indicator);
            messageList.scrollTop = messageList.scrollHeight;
        } else if (!isVisible && indicator) {
            indicator.remove();
        }
    }
};

export default ui;
