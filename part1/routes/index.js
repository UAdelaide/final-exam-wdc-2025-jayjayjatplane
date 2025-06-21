var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.get('api/dogs', async(req, res) => {
  try {
    const [rows] = await debug.query('
      SELECT d.name as ')
  })