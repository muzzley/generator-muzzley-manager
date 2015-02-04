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
      channels.push({
        content: subscriptions[i].alias,
        activity: config.muzzley.activity.activityId+'.'+subscriptions[i].channelId,
        id: subscriptions[i].channelId
      });
    }

    reply(channels);
  });
};

module.exports = handlers;
