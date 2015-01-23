// Dependencies
var config = require('config.js');

var Storage = require('muzzley-idk').helpers.Storage;

var storage = new Storage({
  host: config.redis.host,
  port: config.redis.port
});

module.exports = storage;
