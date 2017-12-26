const { Router } = require('express');

const users = require('../data/users.json');

const router = Router();

router.get('/', (req, res) => {
  res.send(`User is ${req.login}`);
});

router.get('/:id', (req, res) => {
  let user = users.find((user) => user.id == req.params.id);

  res.send(`User name is ${user.name}`);
});

module.exports = router;