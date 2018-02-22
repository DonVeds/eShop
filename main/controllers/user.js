const { Item, User } = require('../../shared/models');
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
    
    if (!req.session.cart || req.session.cart.length == 0) {
      
      res.render('user/cart', {
        title: 'Cart',
        message: 'Your cart is empty',
        cart: true
      });
    }
    Item.find({
      _id: {
        $in: req.session.cart.map(obj => {
          let cart = [];
          cart.push(obj.id);
          return cart;
        })
      }
    })
      .then(items => {
        res.locals.cartObj = req.session.cart;

        res.render('user/cart', {
          title: 'Cart',
          items: items,
          cart: true
        });
      })
      .catch(next);
  },

  // POST /user/item/remove-from-cart
  removeFromCart(req, res) {
    for (let object of req.session.cart) {
      if (object.id == req.body.productId && object.qua > 1) {
        let objIndex = req.session.cart.findIndex(
          obj => obj.id == req.body.productId
        );

        req.session.cart[objIndex].qua = req.session.cart[objIndex].qua - 1;

        res.redirect('/user/cart');
      } else if (object.id == req.body.productId && object.qua == 1) {
        req.session.cart = req.session.cart.filter(
          obj => obj.id !== req.body.productId
        );
        res.redirect('/user/cart');
      }
    }
  },

  // GET /user/wishlist
  showUserWishlist(req, res, next) {
    Item.find({ _id: { $in: req.user.wishlist } })
      .then(items => {
        
        if (items.length == 0) {
          res.render('user/cart', {
            title: 'WishList',
            items: items,
            wishlist: true,
            message: 'Your wishlist is empty'
          });
        } else {
          res.render('user/cart', {
            title: 'WishList',
            items: items,
            wishlist: true,
          });
        }
      })
      .catch(next);
  },

  // POST /user/item/remove-from-wishlist
  removeFromWishlist(req, res, next) {
    User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { wishlist: req.body.productId } },
      { safe: true, upsert: true },
      function() {
        next();
      }
    );
    res.redirect('back');
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