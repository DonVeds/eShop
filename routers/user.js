const { Router } = require('express');
const router = Router();

const { user: {
  showUserPage,
  showUserCart,
  showLoginPage,
  showRegPage
} } = require('../controllers')

router.get('/', showUserPage);
router.get('/cart', showUserCart);
router.get('/login', showLoginPage);
router.get('/reg', showRegPage);

module.exports = router;