/**
 * Representation of a Credential of a provider, normally this 
 * credential is represented as an access token that give access to the 
 * provider API / Cloud, this model stores that information for easier
 * access
 */

// Dependencies
var storage = require('muzzley-idk').helpers.Storage.getDefault();
var keys = require('./keys');

//////////////// Prototype ////////////////////

/**
 * Credentials constructor
 * 
 * @param {object} options Subscription properties:
 *                  - providerId
 *                  - accessToken
 *                  
 * @access public
 * @returns {Credentials}
 */
var Credentials = function (options) {
  options = options || {};

  // feel free to add or remove any property
  this.muzzleyId = options.muzzleyId;
  this.providerId = options.providerId;
  this.accessToken = options.accessToken;
};

/**
 * Save the newly created Credentials object
 * 
 * @param {Credentials~callback} callback
 * @access public
 * @returns {undefined}
 */
Credentials.prototype.save = function (callback) {
  var deviceKey = keys.getCredentialsKey(this.muzzleyId, this.providerId);
  
  storage.client().set(deviceKey, JSON.stringify(this), callback);
};


/////////////// Methods ////////////////////


/**
 * Get specific credential
 * 
 * @param {number|string} muzzleyId      Muzzley profile id 
 * @param {number|string} providerId     Id of the provider device/thing
 * @param {Credentials~callback} callback
 * @access public
 * @returns {undefined}
 */
Credentials.get = function (muzzleyId, providerId, callback) {
  var deviceKey = keys.getCredentialsKey(muzzleyId, providerId);
  storage.client().get(deviceKey, function (err, propsJson) {
    if (err) {
      return callback(new Error('Error loading device: ' + err));
    }
    
    // If empty return empty callback
    if(!propsJson) {
      return callback();
    }
    
    var properties = JSON.parse(propsJson);
    var credentials = new Credentials(properties);
    
    return callback(null, credentials);
  });
};

/**
 * Delete specific credential
 * 
 * @param {number|string} muzzleyId      Muzzley profile id 
 * @param {number|string} providerId     Id of the provider device/thing
 * @param {Credentials~callback} callback
 * @access public
 * @returns {undefined}
 */
Credentials.del = function (muzzleyId, providerId, callback) {
  var key = keys.getCredentialsKey(muzzleyId, providerId);
  storage.client().del(key, callback);
};


/**
 * Callback used by Credentials
 * @callback Credentials~callback
 * @param {object|null} error
 * @param {object|null} result
 */

exports = module.exports = Credentials;