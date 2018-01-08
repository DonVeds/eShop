const items = require('../data/items.json');

module.exports = {

  // GET /b
  redirectTopics(req, res) {
    res.redirect('/b/topics')
  },


  // GET /b/topics 
  showTopics(req, res) {
    let topics = [];
    for (item of items) {
      if ( topics.indexOf(item.topic) == -1 ) {
        topics.push(item.topic)
      }
    }
    res.render('buy/topics', {
      items: items,
      title: 'Topics',
      name: req.name,
      login: req.login,
      password: req.password,
      isTopic: true,
      topics: topics
    });
  },


  // GET /b/topics/:topic
  showItemsByTopic(req, res) {
    let topics = [];
    for (item of items) {
      if (topics.indexOf(item.topic) == -1) {
        topics.push(item.topic)
      }
    }

    let itemsByTopic = items.filter(item => item.topic.toLowerCase().replace(' ', '') == req.params.topic)

    let topicTitle = itemsByTopic[0].topic

    res.render('buy/topics', {
      items: itemsByTopic,
      title: topicTitle,
      name: req.name,
      login: req.login,
      password: req.password,
      isTopic: true,
      topics: topics
    });
  },



  // GET /b/new
  showNew(req, res) {
    newItems = [...items].sort((current, next) => next.year - current.year);

    res.render('buy', { 
      items: newItems, 
      title: 'New', 
      name: req.name, 
      login: req.login, 
      password: req.password,
      isNew: true
    });
  },

  // GET /b/top
  showTop(req, res) {
    let topItems = items.filter(item => item.top);

    res.render('buy', {
      items: topItems,
      title: 'Top',
      name: req.name,
      login: req.login,
      password: req.password,
      isTop: true
    });
  },

  // GET /b/sale 
  showSale(req, res) {
    let saleItems = items.filter(item => item.sale);

    res.render('buy', {
      items: saleItems,
      title: 'Sale',
      name: req.name,
      login: req.login,
      password: req.password,
      isSale: true,
    });
  },


  // GET /b/:item
  showItem(req, res) {
    for (item of items) {
      if (req.params.item.toLowerCase().replace(' ', '') === item.title.toLowerCase().replace(' ', '')) {
        req.item = [item];
        console.log(req.item)
      }
    }

    res.render('buy', {
      items: req.item,
      title: req.item[0].title,
      name: req.name,
      login: req.login,
      password: req.password,
    });
  },
}