const users = require('../data/users.json');

module.exports = (req, res, next) => {
  let user = users.find((user) => user.login == req.query.login && user.password == req.query.password);

  if (user) {
    req.name = user.name;
    req.login = user.login;
    req.password = user.password;
    
    next();
  } else {
    next();
  }
};


// ?login=lel&password=12345
// ?login=kaneki123&password=password
// ?login=karik&password=qwerty