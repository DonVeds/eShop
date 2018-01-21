const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;

mongoose.connect(config.mongodbUrl);

mongoose.connection.on('error', () => console.error.bind(console, 'Mongoose error: '));
mongoose.connection.on('open', () => console.log('Mongoose is workingn'));
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected throught app termination');
    process.exit(0);
  })
});

module.exports = { connection: mongoose.connection }