/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */
const keystone      = require('keystone');
const url           = require('url');

const conf          = require(`${global.__base}/config`);

const { initLocals } = require('./middleware');
const { sendGetRes } = require('./lib/APIRequestHelper');

// Common Middleware
keystone.pre('routes', initLocals);

// Setup Route Bindings
exports = module.exports = nextApp => app => {

    const handle = nextApp.getRequestHandler();

    // REST API routings
    app.get('/api', (req, res) => {
        const data = {
            status: true,
        };
        sendGetRes(req, res, data);
    });

    // Frontend routings
    app.get('/aboutus/:id', (req, res) => {
        console.log('>>>>>>>>>>>>>>>>>');
        return app.render(req, res, '/aboutus/', req.params);
    });
    app.get('*', handle);
};
