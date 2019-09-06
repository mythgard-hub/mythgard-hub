const request = require('request');
const router = require('express').Router();

router.get('/rss', async (req, res) => {
  request('https://teamrankstar.com/feed').pipe(res);
});

module.exports = router;
