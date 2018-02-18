const { Router } = require('express');
const router = Router();

const {
  showSellingPage,
  addItemToSellingList
} = require('../controllers/sell');

console.log(showSellingPage)
router.route('/')
  .get(showSellingPage)
  .post(addItemToSellingList)

module.exports = router;


