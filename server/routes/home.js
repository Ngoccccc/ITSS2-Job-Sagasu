const express = require('express');
const route = express.Router();
const homeController = require('../controllers/HomeConstroller');

route.get('/', homeController.index);

module.exports = route;
