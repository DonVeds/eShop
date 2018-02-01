const router = require('express').Router();

const { items: {
  showItemsPage,
  showItem,
  updateItem,
  findItem,
  showDeletePage,
  deleteItem
} } = require('../controllers')

router.param('item', findItem);

router.route('/')
  .get(showItemsPage)

router.route('/:item/update')
  .get(showItem)
  .post(updateItem)

router.route('/:item/delete')
  .get(showDeletePage)
  .post(deleteItem)

module.exports = router;