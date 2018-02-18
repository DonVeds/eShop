const mongoose = require('mongoose');

const Item = new mongoose.Schema({
  'id': Number,
  'title': String,
  'desc': String,
  'quantity': Number,
  'topic': String,
  'img': String,
  'top': { type: Boolean, default: 'false'},
  'year': Number,
  'sale': { type: Boolean, default: 'false' },
  'secondhand': { type: Boolean, default: 'false' },
});

module.exports = mongoose.model('Item', Item);