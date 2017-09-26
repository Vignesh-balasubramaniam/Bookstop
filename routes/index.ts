import express = require('express');
//module.exports = function (app) {
//    }
var config = require('../config.json');
var sserviceDevHost: string = config.sarnar_service_dev.host;

export function index(req: express.Request, res: express.Response) {
    res.render('index', { title: 'Express' });
};

