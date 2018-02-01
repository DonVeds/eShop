const router = require('express').Router();

const { home: {
  showIndexPage
} } = require('../controllers')

router.get('/', showIndexPage);

module.exports = router;