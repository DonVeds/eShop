const { Router } = require('express');
const router = Router();

const { user: {
  redirectUser,
  showUserProfile,
  showUserCart,
  showLoginPage,
  showRegPage
} } = require('../controllers')

router.get('/', redirectUser);
router.get('/profile', showUserProfile)
router.get('/cart', showUserCart);
router.get('/login', showLoginPage);
router.get('/reg', showRegPage);

module.exports = router;