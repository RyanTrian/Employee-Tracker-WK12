const mysql = require('mysql2');
require('dotenv').config()
// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: process.env.DB_USER,
    // MySQL password
    password: process.env.DB_PASSWORD,
    // Name of database
    database: process.env.DB_NAME
  },
  console.log(`Connected to the database.`)
);

module.exports = db;