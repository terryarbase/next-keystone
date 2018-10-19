const AppEnv = require(`${global.__base}/types/AppEnv`);

// Common setting for all environment
const commonSetting = {
    port: 3013,
    name: 'Next Keystone',
    cachePrefix: 'NextKeystoneCache',
    systemUserName: 'System',
    cronJobTimeFormat: 'YYYY-MM-DD HH:mm:ss',
    cronJobTimeZone: 'Asia/Hong_Kong', // timezone reference: https://momentjs.com/timezone/
    imageUploadMaxSize: 400000,
    thumbnailUploadMaxSize: 200000,
    attachmentUploadMaxSize: 5000000,   // 5MB
    crmLockMax: 5,
    crmLockMin: 5,  // mintues to lock
    imageMineTypeAllowed: ['image/jpeg', 'image/jpg', 'image/png'],
    attachmentMineTypeAllowed: ['application/pdf'],
    cookieSecret: 'P8@D/30,Svd1TL1a6]17%;t6QM13>4:OEbu3o#K8bTu>;SRT-!mFeK1plGjan5a',
    adminPath: 'webadmin',
};

const localhostSetting = {
    dbHost: 'localhost',
    dbName: 'NextKeystoneDb',
	dbLogName: 'NextKeystoneDblog',
    dbAuthEnable: false,
    dbUser: '[dbusername]',
    dbPassword: '[dbpassword]',
    dbPort: 27017,
    appDomain: 'http://localhost:3013/',
    securePort: 3001,
    enableHttp: true,

};

const development4DSetting = {
    dbHost: 'localhost',
    dbName: 'NextKeystoneDb',
    dbLogName: 'NextKeystoneDblog',
    dbAuthEnable: false,
    dbUser: '[dbusername]',
    dbPassword: '[dbpassword]',
    dbPort: 27017,
    appDomain: 'http://localhost:3013/',
    securePort: 3001,
    enableHttp: true,
};

const betaSetting = {
    dbHost: 'localhost',
    dbName: 'NextKeystoneDb',
    dbLogName: 'NextKeystoneDblog',
    dbAuthEnable: false,
    dbUser: '[dbusername]',
    dbPassword: '[dbpassword]',
    dbPort: 27017,
    appDomain: 'http://localhost:3013/',
    securePort: 3001,
    enableHttp: true,
};

const developmentSetting = {
    dbHost: 'localhost',
    dbName: 'NextKeystoneDb',
    dbLogName: 'NextKeystoneDblog',
    dbAuthEnable: false,
    dbUser: '[dbusername]',
    dbPassword: '[dbpassword]',
    dbPort: 27017,
    appDomain: 'http://localhost:3013/',
    securePort: 3001,
    enableHttp: true,
};

const productionSetting = {
    dbHost: 'localhost',
    dbName: 'NextKeystoneDb',
    dbLogName: 'NextKeystoneDblog',
    dbAuthEnable: false,
    dbUser: '[dbusername]',
    dbPassword: '[dbpassword]',
    dbPort: 27017,
    appDomain: 'http://localhost:3013/',
    securePort: 3001,
    enableHttp: true,
};


var config;
const { env: { APP_ENV } } = process;
switch (APP_ENV) {
    case AppEnv.get('localhost'):
        config = localhostSetting;
        break;
    case AppEnv.get('development'):
        config = developmentSetting;
        break;
    case AppEnv.get('beta'):
        config = betaSetting;
        break;
    case AppEnv.get('production'):
        config = productionSetting;
        break;
    default:
        config = localhostSetting;
}
config = {
    ...commonSetting,
    ...config,
};

module.exports = config;
