const router = require('express').Router();

const  {
  redirectUser,
  showUserProfile,
  showUserCart,
  removeFromCart,
  showUserWishlist,
  removeFromWishlist,
  showLoginPage,
  showRegPage,
  loginUser,
  regUser,
  logoutUser
} = require('../controllers/user');

const auth = require('../middleware/auth');

router.route('/')
  .all(auth.allowAuthenticated)
  .get(redirectUser);

router.route('/profile')
  .all(auth.allowAuthenticated)
  .get(showUserProfile);

router.route('/cart')
  .all(auth.allowAuthenticated)
  .get(showUserCart);

router.post('/item/remove-from-cart', removeFromCart);

router.route('/wishlist')
  .all(auth.allowAuthenticated)
  .get(showUserWishlist);

router.post('/item/remove-from-wishlist', removeFromWishlist);

router.route('/login')
  .all(auth.allowUnauthenticated)
  .get(showLoginPage)
  .post(loginUser);

router.route('/reg')
  .all(auth.allowUnauthenticated)
  .get(showRegPage)
  .post(regUser);

router.route('/logout')
  .all(auth.allowAuthenticated)
  .get(logoutUser);

module.exports = router;