// Dependencies
var config = require('config');
var log = require('lib/factory/log');
var Subscription = require('lib/models/Subscription');
var Boom = require('boom');

var handlers = {};

handlers.getChannels = function (request, reply) {
  var muzzleyId = request.query.user;

  Subscription.getAllFromUser(muzzleyId, function(err, subscriptions) {
    if(err) {
      log.error(err);
      return reply(Boom.unauthorized());
    }

    log.debug('Subscriptions', subscriptions);

    var channels = [];

    for(var i in subscriptions) {
      if (subscriptions.hasOwnProperty(i)) {
        channels.push({
          content: subscriptions[i].alias,
          id: subscriptions[i].channelId,
          components: [
            {
              id: 'device1',
              type: 'device',
              label: 'Awesome Device'
            }
          ]
        });
      }
    }

    reply(channels);
  });
};

module.exports = handlers;
