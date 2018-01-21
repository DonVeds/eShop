'use strict'

const path = require('path');

module.exports = {
  version: '1.0.0',
  port: process.env.port || 3000,
  sessionSecret: '12345',
  paths: {
    views: path.resolve(__dirname, '..', 'views'),
    public: path.resolve(__dirname, '..', 'public'),
    lib: path.resolve(__dirname, '..', 'node_modules'),
  },
  admin: {
    login: "admin",
    password: 123 
  }, 
  mongodbUrl:'mongodb://<dbuser>:<dbpassword>@ds046677.mlab.com:46677/eshop',
  mongodb: 'mongodb://localhost:27017/eShop'
};