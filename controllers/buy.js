const items = require('../data/items.json');

module.exports = {

  // GET /b/ 
  showTopics(req, res) {
    topics = [];
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
      topics: topics
    });
  },

  // GET /b/new
  showNew(req, res) {
    //
    // * Do sorting by newest year
    //
    // items.sort((a, b) => {
    //   b.year - a.year
    //   console.log(b.year)
    // })
    res.render('buy', { 
      items: items, 
      title: 'New vinyl', 
      name: req.name, 
      login: req.login, 
      password: req.password 
    });
  },

  // GET /b/top
  showTop(req, res) {
    res.render('buy', {
      items: items,
      title: 'Top sales',
      name: req.name,
      login: req.login,
      password: req.password
    });
  },

  // GET /b/sale 
  showSale(req, res) {
    res.render('buy', {
      items: items,
      title: 'Sale',
      name: req.name,
      login: req.login,
      password: req.password
    });
  },
}