const { Router } = require('express');
const router = Router();

const { sell: {
  showSellingPage,
  addItemToSellingList
} } = require('../controllers');

console.log(showSellingPage)
router.route('/')
  .get(showSellingPage)
  .post(addItemToSellingList)

module.exports = router;


