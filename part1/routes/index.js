var express = require('express');
var router = express.Router();

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

module.exports = router;

