// Dependencies
var config = require('config');
var Api = require('muzzley-idk').helpers.Api;


var api = new Api(
  config.muzzley.api.credentials.id,
  config.muzzley.api.credentials.key,
  {
    url: config.muzzley.api.url
  }
);


module.exports = api;
