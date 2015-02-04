// Dependencies
var config = require('config');
var log = require('lib/factory/log')();
var Provider = require('lib/provider');
var Boom = require('boom');


var handlers = {};

handlers.login = function (request, reply) {
  // Crete new provider object with muzzley id
  var provider = new Provider({muzzleyId: request.query.user});

  // Authenticate and add token
  provider.addToken(request.payload.email, request.payload.password, function(err, credentials) {
    if (err) {
      if(err.code === 'E_INVALID_CREDENTIALS') {
        return reply(Boom.badRequest(err.message));
      }

      return reply(Boom.badRequest('An error occurred, please try again later'));
    }

    if(!credentials) {
      log.debug('Login failed for user '+ request.query.user);
      return reply(Boom.badRequest('An error occurred, please try again later'));
    }

    log.debug('Credentials', credentials);
    request.redirectToAuthorization(credentials.providerId);
  });
};

handlers.authorization = function (request, reply) {

  var provider = new Provider({
    muzzleyId : request.query.user,
    providerId: request.query.providerId
  });

  // If user didn't allow
  if (!request.payload || !request.payload.choice || request.payload.choice !== 'permit') {
    // Log stuff
    log.info('User', request.query.user, 'didn\'t authorize');

    // Delete user token
    provider.removeToken(function (err) {
      if(err) {
        log.error(err);
      }

      return reply().redirect(config.muzzley.api.url + '/authorization?success=false');
    });
  }
  // If user allowed
  else {
    // Log stuff
    log.info('User', request.query.user, 'authorized');

    // Get all devices/channels and stores them
    provider.storeAllChannels(function (err) {
      if(err) {
        log.error(err);
        return reply().redirect(config.muzzley.api.url + '/authorization?success=false');
      }

      return reply().redirect(config.muzzley.api.url + '/authorization?success=true&user=' + request.query.user );
    });
  }
};

module.exports = handlers;
