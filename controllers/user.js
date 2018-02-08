const { User } = require("../models");

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
    res.render("user/cart", {
      title: "Cart",
      name: req.name,
      login: req.login,
      password: req.password
    });
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

  regUser(req, res, next) {
    User.create(req.body)
      .then(() => res.redirect("/buy/secondhand"))
      .catch(next);
  },

  logoutUser(req, res, next) {
    if (req.session) {
      req.session.destroy(error => {
        if (error) return next(error);

        res.redirect("/");
      });
    }
  }
};