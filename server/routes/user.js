const express = require('express');
const route = express.Router();
const userController = require('../controllers/UserConstroller');

route.post('/create', userController.create);
route.get('/', userController.index);

module.exports = route;
