// Require keystone
const keystone = require('keystone');
const constants = require('constants');
// store the base path
global.__base = __dirname;
// Configurations
const configuration = require(`${global.__base}/config`);
// cluster process
// const cluster = require('cluster');
// const processor = require('os').cpus();

const {
    dbHost,
    dbName,
    dbAuthEnable,
    dbPassword,
    port,
    cookieSecret,
    adminPath,
    appDomain,
} = configuration;

var dbUrl = `mongodb://${dbHost}/${dbName}`;
if (dbAuthEnable) {
    dbUrl = `mongodb://${dbUser}:${dbPassword}@${dbHost}/${dbName}`;
}

keystone.init({
    'name': 'Next Keystone Content Management',
    'brand': 'Next Keystone Content Management',
    'mongo': dbUrl,
    'port': port,
    'back url': true,
    'front url': appDomain,
    'signin logo': '/images/logo.png',
    // 'sass': 'public',
    'static': `${global.__base}/static`,
    'favicon': `${global.__base}/static/favicon.ico`,
    'views': 'templates/views',
    'view engine': 'pug',

    'auto update': true,

    'session store': 'mongo',
    'session store options': {
        ttl: 60 * 60,
    },
    'session': true,
    'auth': true,
    'user model': 'User',
    'audit trail model': 'AuditTrail',
    'rbac': 'role',
    'admin path': adminPath,
    'nav style': {
        fontColor: '#ffffff',
        fontHover: '#ffe53d'
    },
    'role list': {
        User: true,
        Role: true,
    },
    'cookie secret': cookieSecret,
    enhancedList: [],
});
// Next app
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app.prepare().then(() => {

    // Load your project's Models
    keystone.import('models');
    /*
     ** SSL Protocol Config (Self signed Certificate)
     ** Only serve for all of Envs except Production Env
     */
    if (process.env.APP_ENV !== 'production') {
        //keystone.set('log config', true);
        // keystone.set('ssl', true);
        // keystone.set('ssl key', 'private/selfsigned.key');
        // keystone.set('ssl cert', 'private/selfsigned.crt');
        // keystone.set('ssl port', securePort);
        /*
         ** SSL & TSL Config
         */
        // disable SSL 2.0 and SSL 3.01
        keystone.set('ssl secureOptions',
            constants.SSL_OP_NO_SSLv3 |
            constants.SSL_OP_NO_SSLv2 |
            constants.SSL_OP_NO_TLSv1 |
            constants.SSL_OP_NO_TLSv1_1
        );
        // use TSL 1.2 instead
        keystone.set('ssl secureProtocol', 'TLSv1_2_method');
        keystone.set('ssl ciphers', [
            'ECDHE-RSA-AES128-GCM-SHA256',
            'ECDHE-ECDSA-AES128-GCM-SHA256',
            'ECDHE-RSA-AES256-GCM-SHA384',
            'ECDHE-ECDSA-AES256-GCM-SHA384',
            'DHE-RSA-AES128-GCM-SHA256',
            'ECDHE-RSA-AES128-SHA256',
            'DHE-RSA-AES128-SHA256',
            'ECDHE-RSA-AES256-SHA384',
            'DHE-RSA-AES256-SHA384',
            'ECDHE-RSA-AES256-SHA256',
            'DHE-RSA-AES256-SHA256',
            'HIGH',
            '!aNULL',
            '!eNULL',
            '!EXPORT',
            '!DES',
            '!RC4',
            '!MD5',
            '!PSK',
            '!SRP',
            '!CAMELLIA',
        ]);
    }

    // Setup common locals for your templates. The following are required for the
    // bundled templates and layouts. Any runtime locals (that should be set uniquely
    // for each request) should be added to ./routes/middleware.js

    // Load your project's Routes
    keystone.set('routes', require(`${global.__base}/routes`)(app));
    keystone.set('pre:dynamic', require(`${global.__base}/utils/helper/BindBodyParser`)); // this is required for audit-trail plugin; should be removed/implemented in other way.

    // Configure the navigation bar in Keystone's Admin UI
    keystone.set('nav', {
        userManagemnt: [
        	'Role',
        	'User',
        ],
    });

    // Start Keystone to connect to your database and initialise the web server
    keystone.start({
        onHttpsServerCreated: () => {},
        onHttpServerCreated: () => {},
    });
});
