const express = require('express');
const path = require('path');

// const middleware = require('./middleware')
const router = require('./routers');

const main =express();

main.set('views', path.join(__dirname, 'views'));
main.set('view engine', 'pug');

main.on('mount', server => {
  main.locals = Object.assign(server.locals, main.locals);
});

main.use((req, res, next) => {
  res.locals.user = req.user;

  next();
});

main.use('/', router.main);
main.use('/user', router.user);
main.use('/buy', router.buy);
main.use('/sell', router.sell);

module.exports = main;