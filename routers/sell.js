const { Router } = require('express');
const router = Router();

const { sell: {
  showSellingPage
} } = require('../controllers');

// router.get('/', showSellingPage)
// |||||
// ERROR

module.exports = router;


