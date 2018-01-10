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

  //GET /user/login
  showLoginPage(req, res){
    res.render('user/login', {
      title: 'Login page',    
    })
  },

  // GIT /user/reg
  showRegPage(req, res){
    res.render('user/reg', {
      title: 'Registration page',
    })
  }
}