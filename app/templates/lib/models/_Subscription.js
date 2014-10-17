/**
 * Representation of a Subscription, that is, the user/channel relation
 */

// Dependencies
var storage = require('muzzley-idk').helpers.Storage.getDefault();
var keys = require('./keys');

//////////////// Prototype ////////////////////

/**
 * Subscription constructor
 * 
 * @param {object} options Subscription properties:
 *                         - muzzleyId
 *                         - channelId
 *                         - providerId
 *                         - alias
 *                         - status: 'on' or 'off'
 * @access public
 * @returns {Credentials}
 */
var Subscription = function (options) {
  options = options || {};
  
  // feel free to add any property that can be usefull for you
  this.muzzleyId = options.muzzleyId;
  this.channelId = options.channelId;
  this.providerId = options.providerId;
  this.alias = options.alias || 'Name of channel';
  this.status = options.status || 'off';
};

/**
 * Save the newly created Subscription object 
 * 
 * @param {type} callback
 * @access public
 * @returns {undefined}
 */
Subscription.prototype.save = function (callback) {
  var subscriptionKey = keys.getSubscriptionKey(this.muzzleyId, this.channelId);

  storage.client().set(subscriptionKey, JSON.stringify(this), callback);
};


/////////////// Methods ////////////////////

/**
 * Get specific subscription 
 * 
 * @param  {string|number}   muzzleyId
 * @param  {string|number}   channelId
 * @param  {Subscription~callback} callback
 * @access public
 * @returns {undefined}    
 */
Subscription.get = function (muzzleyId, channelId, callback) {
  var subscriptionKey = keys.getSubscriptionKey(muzzleyId, channelId);
  storage.client().get(subscriptionKey, function (err, propsJson) {
    if (err) {
      return callback(new Error('Error loading channel: ' + err));
    }
    
    // If empty return empty callback
    if(!propsJson) {
      return callback();
    }
    
    var properties = JSON.parse(propsJson);
    var subscription = new Subscription(properties);

    return callback(null, subscription);
  });
};

/**
 * Get all Subscriptions that belongs to a specific user. 
 * 
 * @param  {string}   muzzleyId
 * @param  {Subscription~callback} callback
 * @access public
 * @returns {loadKeys}
 */
Subscription.getAllFromUser = function (muzzleyId, callback) {
  var subscriptionKey = keys.getSubscriptionKey(muzzleyId, '*');
  
  return loadKeys(subscriptionKey, callback);
};


/**
 * Get all subscriptions that belongs to a specific channel
 * 
 * @param {string} channelId
 * @param {Subscription~callback} callback
 * @access public
 * @returns {undefined}
 */
Subscription.getAllFromDevice = function(channelId, callback) {
  var subscriptionKey = keys.getSubscriptionKey('*', channelId);
  
  return loadKeys(subscriptionKey, callback);
};


/**
 * Get all Subscriptions 
 * 
 * @param  {Subscription~callback} callback
 * @access public
 * @returns {loadKeys}
 */
Subscription.getAll = function (callback) {
  var subscriptionKey = keys.getSubscriptionKey('*', '*');
  
  return loadKeys(subscriptionKey, callback);
};


/**
 * Get subscription(s) that match subscriptionKey pattern
 * 
 * @param {string} subscriptionKey
 * @param {Subscription~callback} callback
 * @access private
 * @returns {undefined}
 */
var loadKeys = function(subscriptionKey, callback) {
  storage.client().keys(subscriptionKey, function (err, keys) {
    if(err || keys.length < 1) {
      return callback(err, []);
    }

    storage.client().mget(keys, function (err, subscriptions) {
      if(err) { return callback(err); }
      for(var s in subscriptions) {
        subscriptions[s] = JSON.parse(subscriptions[s]);
      }
      callback(null, subscriptions);
    });
  });  
};

/**
 * Delete specific subscription
 * 
 * @param {number|string} muzzleyId
 * @param {number|string} channelId
 * @param {Subscription~callback} callback
 * @access public
 * @returns {undefined}
 */
Subscription.del = function (muzzleyId, channelId, callback) {
  var key = keys.getSubscriptionKey(muzzleyId, channelId);
  storage.client().del(key, callback);  
};


/**
 * Callback used by Subscription
 * @callback Subscription~callback
 * @param {object|null} error
 * @param {object|null} result
 */

exports = module.exports = Subscription;