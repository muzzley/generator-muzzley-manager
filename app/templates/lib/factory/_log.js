/*
 * Factory to create and return a new Logger Instance
 */
function Factory() {
  var config = require('config');
  var Logger = require('manager-framework').helpers.Logger;
  
  return Logger(config.bunyan);
}

module.exports = Factory;