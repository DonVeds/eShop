const { Item } = require("../models");
const { passport } = require('../services')

module.exports = {
  // GET /user
  redirectUser(req, res) {
    res.redirect("/user/profile");
  },

  // GET /user/profile
  showUserProfile(req, res) {
    res.render("user", {
      title: "User profile",
      name: req.name,
      login: req.login,
      password: req.password
    });
  },

  // GET /user/cart
  showUserCart(req, res) {
    Item.find({ _id: req.user.cart })
      .then(ids => {
        Item.find({ _id: ids })
          .then(items => {
            // console.log(items);
            
            res.render('user/cart', {
              title: 'Cart',
              items: items
            })
          })
      })
  },

  //GET /user/login
  showLoginPage(req, res) {
    res.render("user/login", {
      title: "Login page"
    });
  },

  // GET /user/reg
  showRegPage(req, res) {
    res.render("user/reg", {
      title: "Registration page"
    });
  },

  loginUser: passport.authenticate("local-login", {
    failureRedirect: "/user/login",
    successRedirect: '/user/profile'
  }),

  regUser: passport.authenticate('local-reg', {
    failureRedirect: '/auth/register',
    successRedirect: '/user'
  }),

  logoutUser(req, res, next) {
    if (req.session) {
      req.session.destroy(error => {
        if (error) return next(error);

        res.redirect("/");
      });
    }
  }
};