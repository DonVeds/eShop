const express = require('express');
const path = require('path');

const admin = express();

const routers = require('./routers');
const auth = require('./middleware/auth')

admin.set('views', path.join(__dirname, 'views'));
admin.set('view engine', 'pug');

admin.on('mount', server => {
  admin.locals = Object.assign(server.locals, admin.locals);
});

admin.use(auth.allowAdmin)

admin.use('/', routers.home);
admin.use('/items', routers.items);
// admin.use('/users', router.users)

module.exports = admin;