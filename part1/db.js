const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password123',
    database: 'DogWalkService'
});

module.exports = db;
