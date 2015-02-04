//Dependencies
var providerModule = require('provider_module');
var Credentials = require('lib/models/Credentials');
var Channel = require('lib/models/Channel');
var Subscription = require('lib/models/Subscription');
var log = require('lib/factory/log')();
var async = require('async');

function Provider(options) {
  options = options || {};

  // feel free to add or remove any property
  this.muzzleyId = options.muzzleyId || '';
  this.id = options.providerId || '';
  this.accessToken = options.accessToken || '';
};

/////////// Adding a new Channel //////////

Provider.prototype.addToken = function(email, password, cb) {
  var self = this;

  providerModule.login(email, password, function(err, user) {
    if(err) {
      return cb(err)
    }

    if(user) {
      // Set token
      var credentialObj = {
        muzzleyId: self.muzzleyId,
        providerId: user.id,
        accessToken: user.token
      };

      // Create new credential obj
      var credentials = new Credentials(credentialObj);

      // Save token
      credentials.save(function(err) {
        if(err) {
          return cb(err);
        }

        return cb(null, credentialObj);
      });
    } else {
      // Create new error
      // with the code E_INVALID_CREDENTAILS
      // so in plugins/auth/handlers we can
      // caught this specific error
      err = new Error('Invalid credentials');
      err.code = 'E_INVALID_CREDENTIALS';
      return cb(err);
    }
  });
};

Provider.prototype.removeToken = function(cb) {
  // Log sutff
  log.debug('Removing access token from', this.muzzleyId);

  Credentials.del(this.muzzleyId, this.id, cb);
};

Provider.prototype.storeAllChannels = function(cb) {
  var self = this;

  Credentials.get(self.muzzleyId, self.id, function(err, credentials) {
    if(err) return cb(err);

    // Check if credentials are empty
    if(!credentials) {
      return cb(new Error('Could not successfully load the credentials'));
    }

    // Store single channel logic goes here
    // Normally using async is the best choice
    // to handle the array with objects

    return cb();
  });
};



///////// Interaction with channel ///////////

Provider.prototype.init = function(channelId, cb) {
  var self = this;

  // Get subscription to get providerId
  Subscription.get(this.muzzleyId, channelId, function(err, sub) {
    if(err) return cb(err);

    if(!sub) {
      return cb(new Error('Subscription not found'));
    }

    // Log stuff
    log.debug('Found subscription', sub);

    // Set id to the scope of the class
    self.id = sub.providerId;

    Credentials.get(self.muzzleyId, self.id, function(err, credential) {
      if(err) return cb(err);

      // Log stuff
      log.debug('Found credential', credential);

      // Set token to the scope of the class
      self.accessToken = credential.accessToken;

      return cb(null);
    });
  });

};


module.exports = Provider;
