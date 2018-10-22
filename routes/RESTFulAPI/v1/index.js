const moment              = require('moment');
const express             = require('express');

const { sendGetRes }      = require(`${global.__base}/routes/lib/APIRequestHelper`);

// Setup Route Bindings
exports = module.exports = app => {
    const route = express.Router();
    app.all('/api/v1/*', (req, res, next) => {
        // web
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
    app.get('/api/v1', (req, res) => {
        const data = {
            status: true,
            timestamp: moment(),
        };
        sendGetRes(req, res, data);
    });
};
