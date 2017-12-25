const express =require('express');

const mainRouter = require('./routers/main');
const usrRouter = require('./routers/usr');
const authRouter = require('./routers/auth');
const loggerMiddleware = require('./middleware/logger');

const server = express();

server.use(loggerMiddleware);

server.use(authRouter);
server.use(mainRouter);
server.use(usrRouter);


const port = 3000;
server.listen(port, () => console.log(`Server is working on localhost:${port}`));