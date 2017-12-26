const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.render('sell', { title: 'Hello Pug' });
});

module.exports = router;