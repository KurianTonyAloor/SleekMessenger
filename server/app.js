import api from './api.js';
import ui from './ui.js';
import socketService from './socket.js';

document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggling ---
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    // Set initial theme based on saved preference or system setting
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    // Listen for toggle changes
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // --- User Search Functionality ---
    const searchInput = document.getElementById('user-search-input');
    const searchResultsContainer = document.getElementById('search-results');
    let searchTimeout;

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout); // Reset the timer on each keystroke
            const query = searchInput.value.trim();

            if (query.length < 2) {
                searchResultsContainer.innerHTML = ''; // Clear results for short queries
                return;
            }

            // Debounce API calls by waiting 300ms after user stops typing
            searchTimeout = setTimeout(async () => {
                try {
                    const users = await api.searchUsers(query);
                    renderSearchResults(users);
                } catch (error) {
                    console.error('Failed to search for users:', error);
                    searchResultsContainer.innerHTML = '<p class="error-message">Search failed.</p>';
                }
            }, 300);
        });
    }

    function renderSearchResults(users) {
        if (!users || users.length === 0) {
            searchResultsContainer.innerHTML = '<p style="padding: 10px;">No users found.</p>';
            return;
        }

        searchResultsContainer.innerHTML = users.map(user => `
            <div class="search-result-item" data-user-id="${user.id}" data-username="${user.username}">
                ${user.username}
            </div>
        `).join('');
    }

    if (searchResultsContainer) {
        searchResultsContainer.addEventListener('click', async (e) => {
            if (e.target.classList.contains('search-result-item')) {
                const userId = e.target.dataset.userId;
                const username = e.target.dataset.username;
                
                try {
                    const result = await api.startConversation(userId);
                    console.log(`Started/found conversation with ${username}:`, result);
                    
                    // Clear search and results
                    searchInput.value = '';
                    searchResultsContainer.innerHTML = '';

                    // TODO: Add logic to open the chat window for this new conversation
                    alert(`Starting chat with ${username}. Conversation ID: ${result.conversationId}`);

                } catch (error) {
                    console.error('Failed to start conversation:', error);
                    alert('Could not start chat. Please try again.');
                }
            }
        });
    }

    // TODO: Initialize socket connection and other app logic
});

