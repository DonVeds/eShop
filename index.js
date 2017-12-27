const express =require('express');
const logger = require('morgan');

const mainRouter = require('./routers/main');
const userRouter = require('./routers/user');
const adminRouter = require('./routers/admin');
const authMiddleware = require('./middleware/auth');
const buyRouter = require('./routers/buy');
const sellRouter = require('./routers/sell');

const server = express();

server.set('view engine', 'pug');

server.use(logger('dev'));
server.use(authMiddleware);

server.use('/', mainRouter);
server.use('/admin', adminRouter);
server.use('/user', userRouter);
server.use('/b', buyRouter);
server.use('/s', sellRouter);


const port = 3000;
server.listen(port, () => console.log(`Server is working on localhost:${port}`));