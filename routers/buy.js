const { Router } = require('express');
const router = Router();

const { buy: {
  findTopics,
  redirectTopics,
  showTopics,
  showItemsByTopic,
  showNew,
  showTop,
  showSale,
  showItem,
} } = require('../controllers');

router.get('/', redirectTopics);
router.get('/topics', findTopics, showTopics);
router.get('/topics/:topic', findTopics, showItemsByTopic)
router.get('/new', showNew);
router.get('/top', showTop);
router.get('/sale', showSale);
router.get('/:item', showItem);

module.exports = router;