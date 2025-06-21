var express = require('express');
var router = express.Router();
const db = require('../db');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/dogs', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        d.name AS dog_name,
        d.size AS size,
        u.username AS owner_username
      FROM Dogs d
      JOIN Users u ON d.owner_id = u.user_id
    `);

    return res.json(rows);
  } catch (err) {
    // eslint-disable-next-line
    console.error('/api/dogs error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/api/walkrequests/open', async (req, res) => {
  try {
    const [rows] = await db.query(`
        SELECT
        wr.request_id,
        d.name AS dog_name,
        wr.requested_time,
        wr.duration_minutes,
        wr.location,
        u.username AS owner_username
      FROM WalkRequests wr
      JOIN Dogs d   ON wr.dog_id   = d.dog_id
      JOIN Users u  ON d.owner_id  = u.user_id
      WHERE wr.status = 'open'
    `);

    return res.json(rows);
  } catch (err) {
    // eslint-disable-next-line
    console.error('/api/walkrequests/open error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/api/walkers/summary', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        u.username AS walker_username,
        COUNT(r.rating_id) AS total_ratings,
        COALESCE(AVG(r.rating), 0) AS average_rating,
        SUM(CASE WHEN r.rating_id IS NOT NULL THEN 1 ELSE 0 END) AS completed_walks
      FROM Users AS u
      LEFT JOIN WalkRatings AS r ON u.user_id = r.walker_id
      WHERE u.role = 'walker'
      GROUP BY u.username
      ORDER BY u.username
    `);
    return res.json(rows);
  } catch (error) {
    // eslint-disable-next-line
    console.error('/api/walkers/summary error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;

