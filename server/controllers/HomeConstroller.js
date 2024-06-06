const User = require('../models/User');

class HomeController {
    index(req, res, next) {
        res.send("<h1>Hello World</h1>");
    }
}

module.exports = new HomeController();
