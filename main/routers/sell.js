const { Router } = require('express');
const router = Router();

const {
  showSellingPage,
  addItemToSellingList
} = require('../controllers/sell');

router.route('/')
  .get(showSellingPage)
  .post(addItemToSellingList);

module.exports = router;


