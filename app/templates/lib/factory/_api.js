/*
 * Factory to create and return a new Api Instance
 */
function Factory() {
  var config = require('config');
  var Api = require('muzzley-idk').helpers.Api;

  return new Api(config.muzzley.api.credentials.id, config.muzzley.api.credentials.key, 
    {url: config.muzzley.api.url}); 
}

module.exports = Factory;