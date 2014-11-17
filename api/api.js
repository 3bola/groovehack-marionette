var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var api = module.exports = express();

api.use(logger('dev'));
api.use(bodyParser.json());

require('./artists/routes')(api);
require('./sets/routes')(api);
require('./venues/routes')(api);

module.exports = api;
