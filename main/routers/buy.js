const { Router } = require('express');
const router = Router();

const {
  findTopics,
  findItem,
  redirectTopics,
  showTopics,
  showItemsByTopic,
  showNew,
  showTop,
  showSale,
  showSecondHand,
  showItem,
  buyItem,
  addItemToCart,
  addItemToWishlist,
  showSearch
} = require('../controllers/buy');

router.param('item', findItem);

router.get('/', redirectTopics);
router.get('/topics', findTopics, showTopics);
router.get('/topics/:topic', findTopics, showItemsByTopic);
router.get('/new', showNew);
router.get('/top', showTop);
router.get('/sale', showSale);
router.get('/secondhand', showSecondHand);
router.get('/search', showSearch);
router.post('/item/cart', addItemToCart);
router.post('/item/wishlist', addItemToWishlist);
router.get('/:item', showItem);
router.get('/:item/buy', buyItem);

module.exports = router;