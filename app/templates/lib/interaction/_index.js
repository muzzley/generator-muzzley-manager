// Dependencies
var config = require('config.js');
var Provider = require('lib/provider');
var log = require('lib/factory/log');
var muzzley = require('lib/factory/muzzleyClient');
var pubsub = require('lib/factory/pubsub');

// Connect client to core
muzzley.initApp({
  token: config.muzzley.app.token
});

// Event listener, on connect
muzzley.on('connect', function (activity) {
  // Subscribe to all message directed to profile
  pubsub.subscribe(function(err, subscription) {
    subscription.on('message', function(message, callback) {
      var payload = message.getPayload();
      var user = message.getUser();

      var provider = new Provider({ muzzleyId: user.profileId });

      // Useful data to handle
      // the incoming message
      var property = payload.property;
      var io = payload.io;
      var channel = payload.channel;

      // Init provider lib to interaction "mode"
      // this will the provider id and the access token
      // of this channel
      provider.init(channel, function(err) {
        // The rest of your handling message logic
      });
    });
  });
});

// Event listener, on error log the error
muzzley.on('error', function (err) {
  log.error(err, '[error] Generic error');
});

// Event listener, warn that user has disconnected
muzzley.on('disconnect', function () {
  log.info('[disconnect] Disconnected!');
});


module.exports = muzzley;
