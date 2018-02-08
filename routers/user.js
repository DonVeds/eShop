const { Router } = require('express');
const router = Router();
const {passport} = require('../services')

const { user: {
  redirectUser,
  showUserProfile,
  showUserCart,
  showLoginPage,
  showRegPage,
  regUser,
  logoutUser
} } = require('../controllers')

router.route("/")
  .get(redirectUser)
router.route("/profile")
  .get(showUserProfile)
router.route("/cart")
  .get(showUserCart)
router.route("/login")
  .get(showLoginPage)
  .post(
    passport.authenticate("local-login", {
      failureRedirect: "/user/login",
      successRedirect: '/user/profile'
    })
  );
router.route("/reg")
  .get(showRegPage)
  .post(
    passport.authenticate("local-reg", {
      failureRedirect: "/user/reg",
      successRedirect: '/user/profile'
    })
  )

router.route('/logout')
  .get(logoutUser)

module.exports = router;