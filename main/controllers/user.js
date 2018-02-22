const { Item } = require('../../shared/models');
const { passport } = require('../../shared/services');

module.exports = {
  // GET /user
  redirectUser(req, res) {
    res.redirect('/user/profile');
  },

  // GET /user/profile
  showUserProfile(req, res) {
    res.render('user', {
      title: 'User profile',
      name: req.name,
      login: req.login,
      password: req.password
    });
  },

  // GET /user/cart
  showUserCart(req, res, next) {
    Item.find({ _id: { $in: req.session.cart.map((obj) => {
      let cart = [];
      cart.push(obj.id);
      return cart;
    })}})
      .then(items => {
        res.locals.cartObj = req.session.cart;
        console.log(res.locals.cartObj);
        
        res.render('user/cart', {
          title: 'Cart',
          items: items,
          cart: true
        });
      })
      .catch(next);
  },

  // GET /user/wishlist
  showUserWishlist(req, res, next) {
    Item.find({ _id: { $in: req.user.wishlist } })
      .then(items => {
        // console.log(items);

        res.render('user/cart', {
          title: 'WishList',
          items: items,
          wishlist: true
        });
      })
      .catch(next);
  },

  //GET /user/login
  showLoginPage(req, res) {
    res.render('user/login', {
      title: 'Login page'
    });
  },

  // GET /user/reg
  showRegPage(req, res) {
    res.render('user/reg', {
      title: 'Registration page'
    });
  },

  // POST /user/login
  loginUser: passport.authenticate('local-login', {
    failureRedirect: '/user/login',
    successRedirect: '/user/profile'
  }),

  // POST /user/reg
  regUser: passport.authenticate('local-reg', {
    failureRedirect: '/auth/register',
    successRedirect: '/user'
  }),

  // GET /user/logout
  logoutUser(req, res, next) {
    if (req.session) {
      req.session.destroy(error => {
        if (error) return next(error);

        res.redirect('/');
      });
    }
  }
};