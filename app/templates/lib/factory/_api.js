/*
 * Factory to create and return a new Api Instance
 */
function Factory() {
  var config = require('config');
  var Api = require('manager-framework').helpers.Api;

  return new Api(config.muzzley.api.credentials.id, config.muzzley.api.credentials.key);
}

module.exports = Factory;