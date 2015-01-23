// Dependencies
var PubSub = require('muzzley-idk').helpers.PubSub;
var config = require('config.js');
var muzzley = require('./muzzley');
var log = require('./log');

var pubsub = new PubSub({
  muzzley: muzzley,
  log: log,
  profile: config.muzzley.app.profile
});

module.exports = pubsub;
