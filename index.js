const express =require('express');

const mainRouter = require('./routers/main');
const usrRouter = require('./routers/usr');
const adminRouter = require('./routers/admin');
const loggerMiddleware = require('./middleware/logger');
const authMiddleware = require('./middleware/auth');

const server = express();

server.use(loggerMiddleware);

server.use(mainRouter);
server.use(adminRouter);

server.use(authMiddleware);
server.use(usrRouter);


const port = 3000;
server.listen(port, () => console.log(`Server is working on localhost:${port}`));