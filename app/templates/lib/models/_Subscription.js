// Dependency
var Model = require('muzzley-idk').helpers.Model;

var Subscription = Model.extend({
  name: 'subscription',
  props: {
    muzzleyId: 'string',
    channelId: 'string',
    providerId: 'string'
  },
  keys: ['muzzleyId', 'channelId']
});

Subscription.getAllFromDevice = function (channelId, cb) {
  return Subscription.mget({muzzleyId: '*', channelId: channelId}, cb);
};

Subscription.getAllFromUser = function (userId, cb) {
  return Subscription.mget({muzzleyId: userId, channelId: '*'}, cb);
};

Subscription.expire = function (keyObj, secs, cb) {
  var key = this.key(keyObj);

  return this.storage.client().expire(key, secs, cb);
};

Subscription.persist = function (keyObj, cb) {
  var key = this.key(keyObj);

  return this.storage.client().persist(key, cb);
};

module.exports = Subscription;
