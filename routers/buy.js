const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.render('buy', { title: 'Hello Pug' });
});

module.exports = router;