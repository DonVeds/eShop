const router = require('express').Router();

router.get('/items', (req, res) => {
  res.render('items', {});
});

module.exports = router;