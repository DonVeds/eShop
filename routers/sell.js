const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.render('sell', { title: 'Selling page', name: req.name, login: req.login, password: req.password });
});

module.exports = router;