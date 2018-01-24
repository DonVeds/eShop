const mongoose = require('mongoose');

const Item = new mongoose.Schema({
  'id': Number,
  'title': String,
  'desc': String,
  'quantity': Number,
  'topic': String,
  'img': String,
  'top': Boolean,
  'year': Number,
  'sale': Boolean,
  'secondhand': Boolean
});

module.exports = mongoose.model('Item', Item);