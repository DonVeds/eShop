const { Item, User } = require('../../shared/models');

module.exports = {
  findTopics(req, res, next) {
    Item.find()
      .then(items => {
        let topics = [];
        for (let item of items) {
          if (topics.indexOf(item.topic) == -1) {
            topics.push(item.topic);
          }
        }
        req.topics = topics;
        next();
      })
      .catch(next);
  },

  findItem(req, res, next) {
    Item.find().then(items => {
      for (let item of items) {
        if (
          req.params.item.toLowerCase().replace(' ', '') ===
          item.title.toLowerCase().replace(' ', '')
        ) {
          req.item = item;
          next();
        }
      }
    });
  },

  // GET /buy
  redirectTopics(req, res) {
    res.redirect('/buy/topics');
  },

  // GET /buy/topics
  showTopics(req, res) {
    Item.find().then(items => {
      res.render('buy/topics', {
        items: items,
        title: 'Topics',
        isTopic: true,
        topics: req.topics
      });
    });
  },

  // GET /buy/topics/:topic
  showItemsByTopic(req, res, next) {
    Item.find({ topic: req.params.topic }).then(items => {
      // console.log(items);

      // let itemsByTopic = items.filter(item => item.topic.toLowerCase().replace(' ', ') == req.params.topic);

      // let topicTitle = itemsByTopic[0].topic;

      res.render('buy/topics', {
        items: items,
        title: items[0].topic,
        isTopic: true,
        topics: req.topics
      });
    }).catch(next);
  },

  // GET /buy/new
  showNew(req, res, next) {
    Item.find()
      .then(items => {
        let newItems = [...items].sort((current, next) => next.year - current.year);

        res.render('buy', { items: newItems, title: 'New', isNew: true });
      })
      .catch(next);
  },

  // GET /buy/top
  showTop(req, res, next) {
    Item.find({ top: true })
      .then(items => {
        res.render('buy', { items: items, title: 'Top', isTop: true });
      })
      .catch(next);
  },

  // GET /buy/sale
  showSale(req, res, next) {
    Item.find({ sale: true })
      .then(items => {
        res.render('buy', { items: items, title: 'Sale', isSale: true });
      })
      .catch(next);
  },

  // GET /buy/secondhand
  showSecondHand(req, res, next) {
    Item.find({ secondhand: true })
      .then(items => {
        res.render('buy', {
          items: items,
          title: 'Second Hand',
          isSecondHand: true
        });
      })
      .catch(next);
  },

  // GET /buy/:item
  showItem(req, res) {
    res.render('buy', {
      items: req.item,
      title: req.item[0].title
    });
  },

  // GET /buy/:item/buy
  buyItem(req, res) {
    res.send('Use some imagination. You just bought this vinyl');
  },

  // POST /buy/item/cart
  addItemToCart(req, res) {
    req.session.cart = req.session.cart || [];

    let ids = []; 

    
    if (req.session.cart.length == 0) {
      console.log(`is array empty: ${req.session.cart.length == 0}`);
      req.session.cart.push({ id: String(req.body.productId), qua: 1 });
      
      console.log(`>create new array ${req.body.productId}`);
      req.flash('cart');
      
      res.redirect('back');
    }
    
    for (let object of req.session.cart) {
      if (object.id == req.body.productId) {
        object.qua ++;
        console.log(`>update ${object.id}`);
        req.flash('cart');

        res.redirect('back');
      }
      ids += object.id;
    }
    
    if ( Boolean(ids.indexOf(req.body.productId) == -1) ) { 
      
      req.session.cart.push({ id: String(req.body.productId), qua: 1 });
      
      console.log(`>add in session array ${req.body.productId}`);
      
      req.flash('cart');
      
      res.redirect('back');
    }

    console.log('>end');
    

  },

  // POST /buy/item/remove-from-cart
  removeFromCart(req, res) {

    for (let object of req.session.cart) {
      
      if (object.id == req.body.productId && object.qua > 1) {
        
        let objIndex = req.session.cart.findIndex((obj => obj.id == req.body.productId));

        req.session.cart[objIndex].qua = req.session.cart[objIndex].qua - 1;


        res.redirect('/user/cart');
      } else if (object.id == req.body.productId && object.qua == 1) {
        req.session.cart = req.session.cart.filter(obj => obj.id !== req.body.productId);
        res.redirect('/user/cart');
      }
    }
  },

  // POST /buy/item/wishlist
  addItemToWishlist(req, res, next) {
    User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { wishlist: req.body.productId } },
      { safe: true, upsert: true },
      function() {
        next();
      }
    );
    req.flash('wishlist');
    res.redirect('back');
  },

  // POST /buy/item/remove-from-wishlist
  removeFromWishlist(req, res, next) {
    User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { wishlist: req.body.productId } },
      { safe: true, upsert: true },
      function() {
        next();
      }
    );
    res.redirect('back');
  },

  // GET /buy/search
  showSearch(req, res) {
    let regexp = new RegExp(req.query.search, 'gi');
    Item.find({
      $or: [{ title: regexp }, { topic: regexp }]
    }).then(items => {
      res.render('buy', {
        items: items,
        title: 'Search',
        query: req.query.search
      });
    });
  }
};