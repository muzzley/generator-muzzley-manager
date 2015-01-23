// Dependencies
var config = require('config');
var logger = require('muzzley-idk').helpers.Logger;


module.exports = logger(config.logger);
