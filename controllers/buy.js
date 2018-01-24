const { Item } = require('../models');

module.exports = {

  findTopics(req, res, next){
    Item.find()
      .then(items => {
        let topics = [];
        for (item of items) {
          if (topics.indexOf(item.topic) == -1) {
            topics.push(item.topic)
          }
        }
        req.topics = topics;
        next()
      })
      .catch(next)
  },

  // GET /buy
  redirectTopics(req, res) {
    res.redirect('/buy/topics')
  },


  // GET /buy/topics 
  showTopics(req, res) {
    Item.find()
      .then(items => {
        res.render('buy/topics', {
          items: items,
          title: 'Topics',
          isTopic: true,
          topics: req.topics
        });
      });
      

  },


  // GET /buy/topics/:topic
  showItemsByTopic(req, res) {
    Item.find()
      .then(items => {

        let itemsByTopic = items.filter(item => item.topic.toLowerCase().replace(' ', '') == req.params.topic)

        let topicTitle = itemsByTopic[0].topic

        res.render('buy/topics', {
          items: itemsByTopic,
          title: topicTitle,
          isTopic: true,
          topics: req.topics
        });
      });
  },



  // GET /buy/new
  showNew(req, res) {
    Item.find()
      .then(items => {
        newItems = [...items].sort((current, next) => next.year - current.year);

        res.render('buy', {
          items: newItems,
          title: 'New',
          isNew: true
        });
      });
  },

  // GET /buy/top
  showTop(req, res) {
    Item.find({ top: true })
      .then(items => {

        res.render('buy', {
          items: items,
          title: 'Top',
          isTop: true
        });
      });
  },

  // GET /buy/sale 
  showSale(req, res) {
    Item.find({ sale: true })
      .then(items => {

        res.render('buy', {
          items: items,
          title: 'Sale',
          isSale: true,
        });
      });
  },

  // GET /buy/secondhand
  showSecondHand(req, res) {
    Item.find({ secondhand: true })
      .then(items => {
        res.render('buy', {
          items: items, 
          title: 'Second Hand',
          isSecondHand: true
        })
      });
  },


  // GET /buy/:item
  showItem(req, res) {
    Item.find()
      .then(items => {
        for (item of items) {
          if (req.params.item.toLowerCase().replace(' ', '') === item.title.toLowerCase().replace(' ', '')) {
            req.item = [item];
            console.log(req.item)
          }
        }

        res.render('buy', {
          items: req.item,
          title: req.item[0].title,
        });
      });
  }

}