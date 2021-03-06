const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const favicon = require('serve-favicon');

const { db, passport } = require('./shared/services');
const config = require('./shared/config');

const main = require('./main');
const admin = require('./admin');

const flash = require('./shared/middleware/flash');

const server = express();

server.set('view engine', 'pug');
server.set('./shared/views', config.paths.views);
server.set('config', config);

server.locals.version = config.version;
server.locals.basedir = config.paths.views;

server.locals = Object.assign(server.locals, config);

server.use(express.static(config.paths.public));
server.use('/lib', express.static(config.paths.lib));
server.use(express.urlencoded({ extended: false }));
server.use(favicon(config.paths.favicon));
server.use(session({
  name: 'sessionId',
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    // secure: true,
    signed: true,
    maxAge: 1000 * 60 * 60 * 24 * 3 // 3 days
  },
  store: new MongoStore({
    mongooseConnection: db.connection,
    ttl: 60 * 60 * 24 * 3, // 3 days
    touchAfter: 60 * 60 * 24 // 1 day
  })
}));

server.use(passport.initialize());
server.use(passport.session());
server.use(flash());

server.use((req, res, next) => {
  res.locals.user = req.user;

  
  next();
});

server.use(logger('dev'));

server.use('/', main);
server.use('/admin', admin);

server.listen(config.port, () => console.log(`Server is working on localhost:${config.port}`));