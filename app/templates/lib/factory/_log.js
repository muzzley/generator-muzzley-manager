// Dependencies
var config = require('config');
var Logger = require('muzzley-idk').helpers.Logger;


var logger = Logger(config.logger);


module.exports = logger;
