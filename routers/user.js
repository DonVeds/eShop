const { Router } = require('express');

const users = require('../data/users.json');

const router = Router();

router.get('/', (req, res) => {
  res.render('user', { title: req.name, name: req.name, login: req.login, password: req.password });
});

router.get('/cart', (req, res) => {
  res.render('user/cart', { title: 'Cart', name: req.name, login: req.login, password: req.password });
});

router.get('/login', (req, res) => {
  res.render('user/login', { title: 'Login' })
})

module.exports = router;