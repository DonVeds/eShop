const { Router } = require('express');
const router = Router();

const { buy: {
  redirectTopics,
  showTopics,
  showItemsByTopic,
  showNew,
  showTop,
  showSale,
  showItem,
} } = require('../controllers');

router.get('/', redirectTopics);
router.get('/topics', showTopics);
router.get('/topics/:topic', showItemsByTopic)
router.get('/new', showNew);
router.get('/top', showTop);
router.get('/sale', showSale);
router.get('/:item', showItem);

module.exports = router;