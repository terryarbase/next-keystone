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
const nextnode      = require('next-nodecms');
const _replace      = require('lodash/replace');
const _camelCase    = require('lodash/camelCase');
const browserify    = require('next-nodecms/admin/server/middleware/browserify');
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
nextnode.pre('routes', initLocals);
// Setup Route Bindings
exports = module.exports = app => {
    const options = {
        outputPath: global.__base,
        hash: nextnode.createKeystoneHash(),
        writeToDisk: nextnode.get('cache admin bundles'),
    };
    const bundles = {
        login: browserify({
            ...options,
            out: 'client/Login/index.js',
            file: `${global.__base}/client/Login/index.js`,
        }),
        // admin: browserify({
        //     ...options,
        //     file: `${global.__base}/client/Admin/index.js`,
        // }),
    };
    bundles.login.build();
   // bundles.admin.build();
    // app.get('/js/app.js', bundles.admin.serve);
    // const webpackDevMiddleware = require('webpack-dev-middleware');
    // const webpackHotMiddleware = require('webpack-hot-middleware');
    // const config = require('./../webpack.admin.config.js');
    // const compiler = webpack(config);
    // const middleware = webpackDevMiddleware(compiler, {
    //     publicPath: config.output.publicPath,
    //     stats: {
    //         colors: true,
    //         timings: true,
    //         chunks: false,
    //         chunkModules: false,
    //         modules: false
    //     }
    // });

    // webpackDevMiddlewares.login = middleware;
    // webpackHotMiddlewares.login = webpackHotMiddleware(
    //     compiler,
    //     hotMiddlewareOptions
    // );

	app.get('/api/appInfo', (req, res) => {
        const data = {
            'app-token': generateToken({
                timestamp: moment(),
                version: 'v1',
            }),
            domain: appDomain,
            // return all of RESTful API endpoint to the client with Camel Case
            api: app._router.stack
                .filter(r => 
                    r.route && r.route.path 
                    && /^\/api\/v1\//.test(r.route.path))
                .reduce((a, b) => {
                    a[_camelCase(_replace(b.route.path , '/', ''))] = `${appDomain}${b.route.path}`;
                    return a;
                }, {}),
        };
        sendGetRes(req, res, data);
    });

    // REST API Version 1 routings
    RESTFullAPIV1(app);

    // Frontend routings
    // ClientAPI(app, nextApp);
};
