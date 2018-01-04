const { Router } = require('express');

const router = Router();

const Items = require('../data/items.json')
// console.log(items)

router.get('/', (req, res) => {
  res.render('buy', { items: Items, title: 'Buying page', name: req.name, login: req.login, password: req.password });
});

module.exports = router;