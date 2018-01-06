const { Router } = require('express');
const router = Router();

const { buy: {
  showTopics,
  showNew,
  showTop,
  showSale,
  showVinyl,
} } = require('../controllers');
// const {
//   topic: { findTopic },
//   vinyl: { findVinyl } 
// } = require('../middleware');

// router.get('/', (req, res) => {
  // res.render('buy', { items: Items, title: 'Buying page', name: req.name, login: req.login, password: req.password });
// });

router.get('/', showTopics);
router.get('/new', showNew);
router.get('/top', showTop);
router.get('/sale', showSale);
// router.get('/:vinyl', findVinyl, showVinyl);

module.exports = router;