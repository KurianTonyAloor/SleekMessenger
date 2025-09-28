// The base URL of your backend server
const BASE_URL = 'http://localhost:3000/api'; // Change if your server runs elsewhere

/**
 * A helper function to handle API requests and responses.
 * @param {string} endpoint - The API endpoint to call.
 * @param {object} options - The options for the fetch request (method, headers, body).
 * @returns {Promise<object>} - The JSON response from the server.
 */
async function request(endpoint, options = {}) {
    // Default headers
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // Include auth token if it exists in localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            // If the server response is not OK, parse the error and throw it
            const errorData = await response.json();
            throw new Error(errorData.message || 'An unknown error occurred');
        }

        return await response.json();
    } catch (error) {
        console.error(`API Error on ${endpoint}:`, error);
        // Here you could trigger a global UI notification to the user
        throw error;
    }
}

// --- API Service Functions ---

const api = {
    /**
     * Registers a new user.
     * @param {string} username
     * @param {string} email
     * @param {string} password
     * @returns {Promise<object>}
     */
    register: (username, email, password) => {
        return request('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
        });
    },

    /**
     * Logs in a user and stores the token.
     * @param {string} email
     * @param {string} password
     * @returns {Promise<object>}
     */
    login: (email, password) => {
        return request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    },

    /**
     * Fetches the message history for a specific conversation.
     * @param {string} conversationId
     * @returns {Promise<object>}
     */
    getMessageHistory: (conversationId) => {
        return request(`/messages/${conversationId}`);
    },

    // Add other necessary API functions here as your application grows
    // e.g., getContacts, getUserProfile, etc.
};

// Export the api object to be used in other scripts like app.js
export default api;
