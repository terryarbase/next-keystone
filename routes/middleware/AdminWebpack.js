const middleware = require('./middleware');

module.exports = function createAdminRoute(app) {
    if (process.env.NODE_ENV !== 'production') {
        app.use(middleware.webpackDevMiddleware('admin'));
        app.use(middleware.webpackHotMiddleware('admin'));
    }
    
};
