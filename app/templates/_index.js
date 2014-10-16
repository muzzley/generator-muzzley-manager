// Dependecies
var Hapi = require('hapi');
var config = require('config');
var plugins = require('lib/plugins');
var async = require('async');
var log = require('lib/factory/log')();
var muzzley = require('lib/interaction');
var qrcode = require('qrcode-terminal');

log.error('#### Starting {{ lname|capitalize }} Manager ####');

var server = new Hapi.Server(config.server.port, config.server.options);

server.ext('onRequest', function (request, next) {
  var obj = { id: request.id, method: request.method, path: request.path, query: JSON.stringify(request.query), payload: request.payload };
  log.debug(obj, '%s %s', request.method.toUpperCase(), request.path);

  next();
});

server.on('response', function (request) {
  var obj = { id: request.id , body: request.response.source };
  log.debug(obj, '%s', request.response.statusCode);
});

async.eachSeries(plugins, function (plugin, cb) {
  server.pack.register(plugin.plugin, plugin.options || { }, function (err) {
    return cb(err);
  });
}, function (err) {
  if (err) {
    log.warn('Failed to load a plugin', err);
    return;
  }
  // Log stuff
  log.info('Plugins loaded');
  
  // Connect to muzzley core
  muzzley.on("connect", function (activity) {
    // Log stuff
    log.info({activity: activity.activityId}, 'Muzzley activity started');

    // Start hapi server
    server.start(function (err) {
      if (err) {
        log.error('Failed to load a plugin', err);
        return;
      }
      log.info('{{ lname|capitalize }} devices manager started @ ' + server.info.uri);
      
      if(config.debug) {
        qrcode.generate('https://www.muzzley.com/play/' + activity.activityId + '.208727');        
      }
    });
  });
});
