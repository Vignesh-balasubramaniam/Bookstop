"use strict";
//module.exports = function (app) {
//    }
var config = require('../config.json');
var sserviceDevHost = config.sarnar_service_dev.host;
function index(req, res) {
    res.render('index', { title: 'Express' });
}
exports.index = index;
;
//# sourceMappingURL=index.js.map