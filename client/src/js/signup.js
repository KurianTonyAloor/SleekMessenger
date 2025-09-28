import api from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.signup-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const messageArea = document.getElementById('message-area');

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = usernameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!username || !email || !password) {
                messageArea.textContent = 'Please fill out all fields.';
                messageArea.className = 'error';
                return;
            }

            try {
                // Call the API's register function
                const response = await api.register(username, email, password);
                
                // Display success message
                messageArea.textContent = response.message;
                messageArea.className = 'success';

                // Redirect to login page after a short delay
                setTimeout(() => {
                    window.location.href = '/login.html';
                }, 2000);

            } catch (error) {
                // Display error message from the server
                messageArea.textContent = error.message;
                messageArea.className = 'error';
            }
        });
    }
});
