// Dependency
var Model = require('muzzley-idk').helpers.Model;

var Subscription = Model.extend({
  name: 'subscription',
  props: {
    muzzleyId: 'string',
    channelId: 'string',
    providerId: 'string',
    alias: 'string'
  },
  keys: ['muzzleyId', 'channelId']
});


Subscription.getAllFromDevice = function(channelId, cb) {
  return Subscription.mget({muzzleyId: '*', channelId: channelId}, cb);
};

Subscription.getAllFromUser = function(userId, cb) {
  return Subscription.mget({muzzleyId: userId, channelId: '*'}, cb);
};


module.exports = Subscription;
