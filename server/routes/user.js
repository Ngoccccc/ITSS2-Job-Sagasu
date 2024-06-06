const express = require('express');
const route = express.Router();
const userController = require('../controllers/UserConstroller');

route.post('/validator', userController.validator); // Đầu vào là email và status: [active, inactive]
route.get('/', userController.index);

module.exports = route;
