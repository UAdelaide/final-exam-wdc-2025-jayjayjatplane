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
  const { username: user, password: pass } = req.body;
  try {
    const sql = `
      SELECT user_id AS id, username, role
      FROM Users
      WHERE username = ? AND password_hash = ?`;
    const [result] = await db.query(sql, [user, pass]);

    if (!result.length) {
      return res.status(401).json({ error: 'Invalid Username or Password. Please Try Again.' });
    }
    const account = result[0];
    req.session.user = {
      id: account.id,
      username: account.username,
      role: account.role
    };
    return res.json({
    message: 'Successfully logged in',
      user: req.session.user
    });
  } catch (error) {
    console.error('Login handler error:', error);
    return res
      .status(500)
      .json({ error: 'Error occured in Login.' });
  }
});

module.exports = router;