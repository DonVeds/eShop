const router = require('express').Router();

const {
  showIndexPage
} = require('../controllers/home');

router.get('/', showIndexPage);

module.exports = router;