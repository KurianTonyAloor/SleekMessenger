import api from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const messageArea = document.getElementById('message-area');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!email || !password) {
                messageArea.textContent = 'Please enter both email and password.';
                messageArea.className = 'error';
                return;
            }

            try {
                // Call the API's login function
                const response = await api.login(email, password);
                
                // On success, save the token to localStorage
                if (response.token) {
                    localStorage.setItem('authToken', response.token);
                    
                    // Redirect to the main chat page
                    window.location.href = '/index.html';
                } else {
                    throw new Error('Login failed: No token received.');
                }

            } catch (error) {
                // Display error message from the server or a default one
                messageArea.textContent = error.message || 'Invalid credentials. Please try again.';
                messageArea.className = 'error';
            }
        });
    }
});

