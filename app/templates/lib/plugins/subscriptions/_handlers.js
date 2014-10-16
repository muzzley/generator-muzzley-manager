// Dependencies /////////////////////////////////////////
var config = require('config');
var log = require('lib/factory/log')();
var api = require('lib/factory/api')();
var async = require('async');
var Subscription = require('lib/models/Subscription');

// Hapi Helpers
var Boom = require('boom');
var Joi = require('joi');

// Your dependecies goes down here

/////////////////////////////////////////////////////////


var routes = {};

routes.subscribe = function (request, reply) {
  var muzzleyId = request.query.user;
  
  async.each(request.payload.channels, function (channel, cb) {

    Subscription.get(muzzleyId, channel.id, function(err, subscription) {
      if(err) return cb(err);

      if(subscription.status == channel.status) {
        log.debug({channel: channel.id, username: request.query.user}, 'No changes on this subscription');
        return cb();
      }

      if(subscription.status == 'off' && channel.status == 'on') {
        log.debug({channel: channel.id, username: request.query.user}, 'New subscription');
      }
      else if(subscription.status == 'on' && channel.status == 'off') {
        log.debug({channel: channel.id, username: request.query.user}, 'Unsubscribing');
      }

      subscription.status = channel.status;
      
      // Post to api the subscription if the user is making
      // a new subscriptions
      // If the user is unsubscribing
      // save the subscription as status off
      if(channel.status == 'on') {
        return postSubscription(channel.id, muzzleyId, cb);
      } else {
        return subscription.save(cb); 
      }
    });
  }, function (err) {
    if (err) log.warn(err, 'Failed to subscribe');

    reply(200);
  });
};


function postSubscription(channelId, muzzleyId, cb) {
  api.post(channelId, [{
    content: ' ',
    photoUrl: config.server.host+config.server.images.firstPost
  }], function (err) {
    if (err) {
      log.error('{{ lname|capitalize }} post to api failed', err);
      return cb(err);
    }
    
    log.info({channel: channelId, muzzleyProfile: muzzleyId, photoUrl: config.server.host+config.server.images.firstPost}, '{{ lname|capitalize }} first post');
    return cb();
  });
}

module.exports = routes;