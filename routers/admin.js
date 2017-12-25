const { Router } = require('express');

const admin = require('../config');

const router = Router();

router.get('/', (req, res) => {
  if (req.query.login == admin.auth.login && req.query.password == admin.auth.password) {
    res.send('Admin page');
  } else {
    res.send('Wrong login or password');
  }
});

module.exports = router;

// /admin?login=admin&password=123


