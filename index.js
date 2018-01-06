const express =require('express');
const logger = require('morgan');

const config = require('./config');
const router = require('./routers');
const authMiddleware = require('./middleware/auth')

const server = express();

server.set('view engine', 'pug');
server.set('views', config.paths.views);

server.locals = Object.assign(server.locals, config);

server.use(express.static(config.paths.public));
server.use('/lib', express.static(config.paths.lib));

server.use(logger('dev'));
server.use(authMiddleware);

server.use('/', router.main);
server.use('/admin', router.admin);
server.use('/user', router.user);
server.use('/b', router.buy);
server.use('/s', router.sell);

server.listen(config.port, () => console.log(`Server is working on localhost:${config.port}`));