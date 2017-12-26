const express =require('express');
const logger = require('morgan');

const mainRouter = require('./routers/main');
const usrRouter = require('./routers/usr');
const adminRouter = require('./routers/admin');
const authMiddleware = require('./middleware/auth');

const server = express();

server.set('view engine', 'pug');

server.use(logger('dev'));

server.use('/', mainRouter);
server.use('/admin', adminRouter);

server.use(authMiddleware);
server.use('/usr', usrRouter);


const port = 3000;
server.listen(port, () => console.log(`Server is working on localhost:${port}`));