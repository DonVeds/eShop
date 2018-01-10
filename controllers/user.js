const users = require('../data/users.json');

module.exports = {
  
  // GET /user
  showUserPage(req, res){
    res.render('user', { 
      title: req.name,
      name: req.name,
      login: req.login, 
      password: req.password 
    });
  },

  // GET /user/cart
  showUserCart(req, res){
    res.render('user/cart', {
      title: 'Cart',
      name: req.name,
      login: req.login,
      password: req.password 
    })
  },

  //GET / user/cart
  showLoginPage(req, res){
    res.render('user/login', {
      title: 'Login page',
      name: req.name,
      login: req.login,
      password: req.password     
    })
  }
}