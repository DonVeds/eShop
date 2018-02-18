const { Router } = require('express');
const router = Router();

const  {
  showMainPage
} = require('../controllers/main')


router.get('/', showMainPage);

module.exports = router;