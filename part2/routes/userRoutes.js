const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET all users (for admin/testing)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT user_id, username, email, role FROM Users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST a new user (simple signup)
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const [result] = await db.query(`
      INSERT INTO Users (username, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `, [username, email, password, role]);

    return res.status(201).json({ message: 'User registered', user_id: result.insertId });
  } catch (error) {
    return res.status(500).json({ error: 'Registration failed' });
  }
});

router.get('/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  return res.json(req.session.user);
});

// Route: POST /login
router.post('/login', async function (req, res) {
  // Pull username and password from the request body
  const { username: user, password: pass } = req.body;
  try {
    // fetch id, username, and role
    const sql = `
      SELECT user_id AS id, username, role
      FROM Users
      WHERE username = ? AND password_hash = ?`;
    // Execute with given username and password
    const [result] = await db.query(sql, [user, pass]);
    // if invalid, reject with 401
    if (!result.length) {
      return res.status(401).json({ error: 'Invalid Username or Password. Please Try Again.' });
    }
    // else if success, store user info in the session
    const account = result[0];
    req.session.user = {
      id: account.id,
      username: account.username,
      role: account.role
    };
    // Success Message
    return res.json({ message: 'Successfully logged in', user: req.session.user });
  } catch (error) {
    // Unexpected error boundary test cases
    /* eslint-disable no-console */
    console.error('Login handler error:', error);
    return res.status(500).json({ error: 'Error occured in Login.' });
  }
});

router.post('/logout', function (req, res) {
  // destroy the session
  req.session.destroy((err) => {
    if (err) {
      // log error
      console.error("Failed to end user session on logout:", err);
      // send failure response
      return res.status(500).json({ logout: false, error: 'Logout failed' });
    }
    // remove the session cookie
    res.clearCookie('connect.sid', {
      path: '/',
      httpOnly: true,
    });
    // send success response
    return res.json({ logout: true });
  });
});

module.exports = router;
