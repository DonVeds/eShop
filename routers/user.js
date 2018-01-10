const { Router } = require('express');
const router = Router();

const { user: {
  showUserPage,
  showUserCart,
  showLoginPage
} } = require('../controllers')

router.get('/', showUserPage);
router.get('/cart', showUserCart);
router.get('/login', showLoginPage)

module.exports = router;