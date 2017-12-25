const express =require('express');

const usrRouter = require('./routers/usr');

const server = express();

server.get('/', (req, res) => {
  res.send('Main page');
});

server.use(usrRouter);

const port = 3000;
server.listen(port, () => console.log(`Server is working on localhost:${port}`));