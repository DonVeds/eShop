const users = require('../data/users.json');

module.exports = (req, res, next) => {
  let user = users.find((user) => user.login == req.query.login && user.password == req.query.password);

  if (user) {
    next();
  } else {
    res.redirect('/');
  }
};

// ?login=lel&password=12345
// ?login=kaneki123&password=password
// ?login=karik&password=qwerty