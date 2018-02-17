'use strict'

const path = require('path');

module.exports = {
  version: '1.0.0',
  port: process.env.port || 5000,
  sessionSecret: '12345',
  paths: {
    views: path.resolve(__dirname, '..', 'views'),
    public: path.resolve(__dirname, '..', 'public'),
    lib: path.resolve(__dirname, '..', 'node_modules'),
    favicon: path.resolve(__dirname, '..', 'public', 'favicon.ico')
  },
  admin: {
    login: "admin",
    password: 123 
  }, 
  mongodbUrl:'mongodb://admin:FKy-JGu-rc3-yWq@ds046677.mlab.com:46677/eshop'
};