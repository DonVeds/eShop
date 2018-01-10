const { Router } = require('express');
const router = Router();

const { admin: {
  redirectAdmin,
  showAdminLogin,
  showAdminPanel
} } = require('../controllers')

router.get('/', redirectAdmin);
router.get('/login', showAdminLogin);
router.get('/panel', showAdminPanel)

module.exports = router;



