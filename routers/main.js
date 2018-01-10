const { Router } = require('express');
const router = Router();

const { main: {
  showMainPage
} } = require('../controllers')


router.get('/', showMainPage);

module.exports = router;