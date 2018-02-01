const { Item } = require('../../models');

module.exports = {

  findItem(req, res, next) {
    Item.find()
      .then(items => {
        for (item of items) {
          if (req.params.item.toLowerCase().replace(' ', '') === item.title.toLowerCase().replace(' ', '')) {
            req.item = item;
            // console.log(req.item)
          }
        }

        next();
      })
      .catch(next);
  },
  // GET /admin/items
  showItemsPage(req, res) {
    Item.find()
      .then(items => {
        res.render('items', {
          items: items
        })
      });
  },
  // GET /admin/items/:item
  showItem(req, res) {
    res.render('items/item', {
      item: req.item
    });
  },

  updateItem(req, res, next) {
    Item.findOneAndUpdate({ _id: req.item._id }, req.body)
      .then(res.redirect('/admin/items'))
      .catch(next)
  },

  showDeletePage(req, res) {
    res.render('items/deleteItem', {
      item: req.item
    });
  },

  deleteItem(req, res, next) {
    req.item.remove()
      .then(res.redirect('/admin/items'))
      .catch(next)
  }
};