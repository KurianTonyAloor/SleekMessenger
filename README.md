Sleek Messenger 🚀Sleek Messenger is a modern, real-time instant messaging application featuring a stunning glassmorphic UI, unique animations, and a seamless user experience. Built with a powerful backend stack, it supports instant text chat, user discovery, and lays the groundwork for future WebRTC-based communication.✨ Key FeaturesReal-Time Chat: Instant bidirectional communication powered by Socket.io.Stunning Glassmorphic UI: A modern, blur-effect interface that looks incredible.Light & Dark Modes: A theme toggle to switch between a light and dark UI, with the user's preference saved locally.User Search: Easily find and start conversations with any registered user on the platform.Secure Authentication: User registration and login system using JWT (JSON Web Tokens) for secure API access.Modern Frontend: Built with clean HTML5, advanced CSS, and modular JavaScript (ESM).Robust Backend: A scalable server built with Node.js and Express.js.Persistent Storage: All users, conversations, and messages are stored in a MySQL database.🛠️ Tech StackThis project is built with a modern and scalable technology stack.Frontend:HTML5CSS3 (with Flexbox & Grid for layout)JavaScript (ES6+ Modules)Socket.io ClientWebRTC API (for future video/voice features)Backend:Node.js (Runtime Environment)Express.js (Web Framework)Socket.io (Real-Time Engine)MySQL2 (Database Driver)JWT (jsonwebtoken) (Authentication)bcrypt.js (Password Hashing)dotenv (Environment Variable Management)Nodemon (Development server with auto-reload)Database:MySQL🚀 Getting StartedFollow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.PrerequisitesNode.js and npm: Download Node.js (npm is included)MySQL: A running instance of a MySQL server. You can use the MySQL Community Installer.1. Database SetupConnect to MySQL: Log in to your MySQL server (using MySQL Workbench or the command line).Create Database & User: Run the following SQL commands. Replace 'your_chosen_password' with a strong password.CREATE DATABASE sleek_messenger_db;
CREATE USER 'sleekuser'@'localhost' IDENTIFIED BY 'your_chosen_password';
GRANT ALL PRIVILEGES ON sleek_messenger_db.* TO 'sleekuser'@'localhost';
FLUSH PRIVILEGES;
Create Tables: Use the new database and run the table creation script:USE sleek_messenger_db;
-- Paste the entire table creation SQL from the project setup instructions here...
2. Backend Server SetupNavigate to the Server Directory:cd server
Create .env File: Create a file named .env in the server/ directory and add your configuration:DB_HOST=localhost
DB_USER=sleekuser
DB_PASSWORD=your_chosen_password
DB_NAME=sleek_messenger_db
JWT_SECRET=a_very_long_and_secure_secret_for_your_tokens
Install Dependencies:npm install
Start the Server:npm run dev
The backend server will start on http://localhost:3000.3. Frontend Client SetupOpen a New Terminal: Keep the backend server running. Open a separate terminal window.Navigate to the Client Directory:cd client
Install Dependencies:npm install
Start the Client:npm start
Your default browser will open to the login page, typically at http://localhost:5500/login.html.You can now register a new account and start using the messenger!📂 Folder StructureThe project is organized into two main parts: client and server, to maintain a clear separation of concerns./sleek-messenger
├── client/         # All frontend code (HTML, CSS, client-side JS)
└── server/         # All backend code (Node.js, Express, Database models, etc.)
🌟 Future Enhancements[ ] Implement WebRTC for 1-on-1 video and voice calls.[ ] Show user online/offline status.[ ] Implement typing indicators.[ ] Add group chat functionality.[ ] Deploy to a cloud service like AWS or Heroku.📄 LicenseThis project is licensed under the MIT License.
