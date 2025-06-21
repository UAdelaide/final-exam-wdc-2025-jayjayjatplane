const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Session
app.use(session({
    secret: 'cherrytea',
    resave: false,
    saveUninitialised: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }
}));

// Export the app instead of listening here
module.exports = app;