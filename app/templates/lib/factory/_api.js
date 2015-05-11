// Dependencies
var config = require('config');
var storage = require('./storage');
var Api = require('muzzley-idk').helpers.Api;


var api = new Api(
  config.muzzley.app.profile,
  config.muzzley.api.credential,
  {
    url: config.muzzley.api.url,
    storage: storage
  }
);


module.exports = api;
