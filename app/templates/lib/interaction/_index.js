// Dependencies /////////////////////////////////////////
var config = require('config');
var Provider = require('lib/provider');
var log = require('lib/factory/log')();
var muzzley = require('lib/factory/muzzleyClient')();
var api = require('lib/factory/api')();

// Your dependecies goes down here

/////////////////////////////////////////////////////////

// Connect client to core
muzzley.connectApp(config.muzzley.activity);

// Event listener, on connect
muzzley.on('connect', function (activity) {
  
  // Event listener, when participant joins
  activity.on('participantJoin', function (participant) {
    // Log stuff
    log.info('Participant', participant.profileId, 'a message to notify the user has joined the activity', participant.context);
    log.debug(participant.id, "Participant joined");
    
    // Get clean participant object
    var user = {
      id: participant.id,
      profileId: participant.profileId,
      deviceId: participant.deviceId,
      providerDeviceId: participant.context,
      photoUrl: participant.photoUrl      
    };

    var provider = new Provider({muzzleyId: user.profileId});

    provider.innit(user.providerDeviceId, function(err) {
      if(err) {
        log.error(err);
        return;
      }      

      // Change the view on the application
      // to the webview of the manager
      participant.changeWidget('webview', {
        uuid: config.muzzley.webview,
        orientation: 'portrait'
      },function (err) {
        if(err) log.error('changeWidget', err);
      });

      // When user quits the activity
      participant.on('quit', function () {
        // Log stuff
        log.info('Participant', participant.profileId, 'a message to notify the user has quit the activity', participant.context);
        log.debug({id: participant.id, profileId: participant.profileId, deviceId: participant.deviceId, context: participant.context}, 'Participant Quit');
      });    
      
      // When widget send a message to manager
      participant.on('signalingMessage', function (type, message, callback) {
        // An RPC request
        if (callback) {
          // Log stuff
          log.debug('RPC request: ' + type + ' with message ' + message);

          switch (type) {
            case 'saveCurrentProgress':
              saveProgress();
              return callback(true, 'Successfully saved', {lives: getLives()});
            case 'incrementSomething':
              var curValue = increment();
              return callback({count: curValue});
            default:
              return log.warn('Unknown RPC request: '+ type);
          }
        }
        // A one-way request
        else {
          // Log stuff
          log.debug('one-way request: ' + type + ' with message ' + message);

          switch (type) {
            case 'doSomeAction':
              return doIt();
            default:
              return log.warn('Unknown one-way request: '+ type);
          }
        }    
      });      
    });
  });
});

// Event listener, on error log the error
muzzley.on('error', function (err) {
  log.error(err, '[error] Generic error');
});

// Event listener, warn that user has disconnected
muzzley.on('disconnect', function () {
  log.info('[disconnect] Disconnected!');
});

// Optional Event listeners
muzzley.on('connectError', function (err) {
  log.error('[connectError] Error connecting:', err);
});

muzzley.on('connectTimeout', function (timeout) {
  log.error('[connectTimeout] Connection timeout (ms):', timeout);
});

muzzley.on('reconnectAttempt', function (attempt) {
  log.warn('[reconnectAttempt] Attempting to reconnect:', attempt);
});

muzzley.on('reconnect', function (attempt) {
  log.info('[reconnect] Successfully reconnected after attempt:', attempt);
});

muzzley.on('reconnectError', function (err) {
  log.error('[reconnectError] Error reconnecting:', err);
});

muzzley.on('reconnectFailed', function () {
  log.error('[reconnectFailed] Could not reconnect after max defined attempts');
});

module.exports = muzzley;