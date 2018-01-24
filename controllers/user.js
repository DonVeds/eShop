const users = require('../data/users.json');

module.exports = {
  
  redirectUser(req, res) {
    res.redirect('/user/login')
  },

  // GET /user
  showUserProfile(req, res){
    res.render('user', { 
      title: 'User profile',
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