// Dependencies
var log = require('lib/factory/log')();
var async = require('async');
var Subscription = require('lib/models/Subscription');
var Channel = require('lib/models/Channel');
var Boom = require('boom');

var routes = {};

routes.subscribe = function (request, reply) {
  var muzzleyId = request.query.user;

  async.each(request.payload.channels, function (channel, cb) {

    Subscription.get(muzzleyId, channel.id, function(err, subscription) {
      if(err) {
        return cb(err);
      }

      // Handle if user is
      // unsubscribing this channel
      if(channel.status === 'off') {
        log.debug({channel: channel.id, username: request.query.user}, 'Unsubscribing');

        // First we will get all
        // subscriptions from this
        // device
        return Subscription.getAllFromDevice(channel.id, function(err, subs) {
          if(err) {
            return cb(err);
          }

          // Delete the subscription
          // the user requested to
          Subscription.del(muzzleyId, channel.id, function(err) {
            if(err) {
              return cb(err);
            }

            // Check if all subscriptions returned from this channel
            // if they'r are lower or equal to 1
            // if yes delete the Channel
            // since no one is subscribed to it, therefore nobody is using
            // this information
            if(subs.length <= 1) {
              Channel.del(channel.id, function(err) {
                return cb(err);
              });
            } else {
              return cb();
            }
          });
        });
      } else {
        log.debug({channel: channel.id, username: request.query.user}, 'No changes on this subscription');
        return cb();
      }
    });
  }, function (err) {
    if (err) {
      log.error(err);
      return reply(Boom.badRequest(err));
    }

    return reply(200);
  });
};


module.exports = routes;
