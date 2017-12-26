const users = require('../data/users.json');

module.exports = (req, res, next) => {
  let user = users.find((user) => user.login == req.query.login && user.password == req.query.password);

  if (user) {
    req.login = user.name;
    req.password = req.query.password;
    
    next();
  } else {
    user = 'User';
    next();
  }
};

// ?login=lel&password=12345
// ?login=kaneki123&password=password
// ?login=karik&password=qwerty