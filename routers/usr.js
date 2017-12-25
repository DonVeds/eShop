const express = require('express');

const users = require('../data/users.json');

const router = express.Router();

router.get('/usr', (req, res) => {
  res.send('User page');
});

router.get('/usr/:id', (req, res) => {
  let user = users.find((user) => user.id == req.params.id);

  res.send(`User name is ${user.name}`);
});

module.exports = router;