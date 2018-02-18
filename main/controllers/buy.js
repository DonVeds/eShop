const { Item, User } = require('../../shared/models');

module.exports = {

  findTopics(req, res, next) {
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

  findItem(req, res, next) {
    Item.find()
      .then(items => {
        for (item of items) {
          if (req.params.item.toLowerCase().replace(' ', '') === item.title.toLowerCase().replace(' ', '')) {
            req.item = item;
            next()
          }
        }
      });
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
    Item.find({ topic: req.params.topic })
      .then(items => {
        // console.log(items);
        
        // let itemsByTopic = items.filter(item => item.topic.toLowerCase().replace(" ", "") == req.params.topic);

        // let topicTitle = itemsByTopic[0].topic;

        res.render("buy/topics", {
          items: items,
          title: items[0].topic,
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
    res.render('buy', {
      items: req.item,
      title: req.item[0].title,
    });
  },

  // GET /buy/:item/buy
  buyItem(req, res) {
    res.send('Use some imagination. You just bought this vinyl')
  },

  // GET /buy/:item/cart
  addItemToCart(req, res) {
    User.findOneAndUpdate(
      {_id: req.user._id}, 
      {$push: {cart: req.item._id} },
      {safe: true, upsert: true },
      function (err, model) {
        console.log(err);
      }
    );
    res.redirect(req.get('referer'));
  },

  // GET /buy/search
  showSearch(req, res) {
    let regexp = new RegExp(req.query.search, 'gi')
    Item.find({ 
      $or: [
        {title: regexp},
        {topic: regexp}
      ]
    })
      .then(items => {
        res.render('buy', {
          items: items,
          title: 'Search',
          query: req.query.search
        });
      });
  },

}