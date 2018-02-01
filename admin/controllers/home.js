const { Item } = require('../../models');



module.exports = {
  showIndexPage(req, res) {
    Item.find()
      .then(items => {
        res.render('index', {
          items: items
        })
      });
  }
};