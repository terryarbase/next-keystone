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
const moment        = require('moment');
const url           = require('url');

const { 
	appDomain,
} = require(`${global.__base}/config`);

const { initLocals } = require(`${global.__base}/routes/middleware`);

// API Set
const RESTFullAPIV1 = require(`${global.__base}/routes/RESTFulAPI/v1`);
const ClientAPI = require(`${global.__base}/routes/ClientAPI`);

const { sendGetRes }      = require(`${global.__base}/routes/lib/APIRequestHelper`);
const { generateToken }      = require(`${global.__base}/routes/lib/Authentication`);

// Common Middleware
keystone.pre('routes', initLocals);

// Setup Route Bindings
exports = module.exports = nextApp => app => {

	app.get('/api/appInfo', (req, res) => {
        const data = {
            'app-token': generateToken({
                timestamp: moment(),
                version: 'v1',
            }),
            endpoint: '/api/v1',
            domain: appDomain,
        };
        sendGetRes(req, res, data);
    });
    // REST API Version 1 routings
    RESTFullAPIV1(app);

    // Frontend routings
    ClientAPI(app, nextApp);
};
