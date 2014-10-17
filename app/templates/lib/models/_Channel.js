/**
 * Representation of a Channel, it is better represented
 * as a thing., it can be your cat, you, a sensor, a piece of hardware
 * it can be anything basically, it depends solely of provider business
 * logic
 * 
 */

// Dependencies
var storage = require('muzzley-idk').helpers.Storage.getDefault();
var keys = require('./keys');

//////////////// Prototype ////////////////////

/**
 * Channel constructor
 * 
 * @param {Object} options
 * @access public
 * @returns {Channel}
 */
var Channel = function (options) {
  options = options || {};
  
  this.id = options.id;
  this.name = options.name || 'Default name';

      /////////////////////////////////
     // you must add here the rest  //
    //  properties your device     //
   //   have                      // 
  /////////////////////////////////
};

/**
 * Save the newly created Channel object
 * 
 * @param {Function} callback
 * @access public
 * @returns {undefined}
 */
Channel.prototype.save = function (callback) {
  var channelKey = keys.getChannelKey(this.id);
  
  storage.client().set(channelKey, JSON.stringify(this), callback);
};


/////////////// Methods ////////////////////

/**
 * Get specific channel
 * 
 * @param {number|string} channelId
 * @param {Channel~callback} callback
 * @access public
 * @returns {undefined}
 */
Channel.get = function (channelId, callback) {
  var channelKey = keys.getChannelKey(channelId);
  storage.client().get(channelKey, function (err, propsJson) {
    if (err) {
      return callback(new Error('Error loading channel: ' + err));
    }
    // If empty return empty callback
    if(!propsJson) {
      return callback();
    }
    
    var properties = JSON.parse(propsJson);
    var channel = new Channel(properties);

    return callback(null, channel);
  });
};


/**
 * Get all channels
 * 
 * @param {Channel~callback} callback
 * @access public
 * @returns {undefined}
 */
Channel.getAll = function(callback) {
  var channelKey = keys.getChannelKey('*');
  
  storage.client().keys(channelKey, function (err, keys) {
    if(err || keys.length < 1) {
      return callback(err, []);
    }

    storage.client().mget(keys, function (err, channels) {
      if(err) { return callback(err); }
      for(var s in channels) {
        channels[s] = JSON.parse(channels[s]);
      }
      callback(null, channels);
    });
  });   
};


/**
 * Delete channel from Redis
 * 
 * @param {number|string} channelId
 * @param {Channel~callback} callback
 * @access public
 * @returns {undefined}
 */
Channel.del = function(channelId, callback) {
  var key = keys.getChannelKey(channelId);
  storage.client().del(key, callback);  
};


/**
 * Callback used by Channel
 * @callback Channel~callback
 * @param {object|null} error
 * @param {object|null} result
 */

exports = module.exports = Channel;