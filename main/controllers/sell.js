const { Item } = require('../../shared/models');

module.exports = {

  // GET /sell
  showSellingPage(req, res){
    res.render('sell')
  },

  addItemToSellingList(req, res, next) {
    Item.create(req.body)
      .then(() => res.redirect('/user/profile'))
      .catch(next)
  }
}