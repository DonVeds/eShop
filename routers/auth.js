const { Router } = require('express');

const users = require('../data/users.json');

const router = Router();

router.get('/auth', (req, res) => {
  console.log(req.query);
  
  let user = users.find((user) => user.login == req.query.login && user.password == req.query.password);

  if (user) {
    res.send(`Hello ${user.name}`);
  } else {
    res.send('Can\'t find user by login or/and password');
  }
});

module.exports = router;

// http://localhost:3000/auth?login=lel&password=12345
// http://localhost:3000/auth?login=kaneki123&password=password
// http://localhost:3000/auth?login=karik&password=qwerty
