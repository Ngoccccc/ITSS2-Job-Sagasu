const userRoute = require('./user');
const homeRoute = require('./home');

function route(app) {
    app.use('/user', userRoute);
    app.use('/', homeRoute);
}

module.exports = route;