import mysql from 'mysql2/promise';
import 'dotenv/config';

// Create a connection pool to the database
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log('MySQL connection pool created.');

// Export the pool to be used in models
export default pool;
