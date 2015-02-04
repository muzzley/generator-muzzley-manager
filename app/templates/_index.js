// Dependecies
var Hapi = require('hapi');
var config = require('config');
var async = require('async');
var log = require('lib/factory/log');
var storage = require('lib/factory/storage');
var Model = require('muzzley-idk').helpers.Model;

// Set the prefix of redis data
// with the manager name
Model.setPrefix('{{ lname }}');

// Set the default storage of the models
// with the storage instance from lib/factory
Model.setStorage(storage);

// Load plugins after we set the prefix
var plugins = require('lib/plugins');

// This will init your manager interaction service
require('lib/interaction');

log.error('#### Starting {{ lname|capitalize }} Manager ####');

var server = new Hapi.Server(config.server.port, config.server.options);

server.ext('onRequest', function (request, next) {
  var obj = { id: request.id, method: request.method, path: request.path, query: JSON.stringify(request.query), payload: request.payload };
  log.debug(obj, '%s %s', request.method.toUpperCase(), request.path);

  next();
});

// Middleware
server.on('response', function (request) {
  var obj = { id: request.id , method: request.method, path: request.path, query: request.query};
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

  // Start hapi server
  server.start(function (err) {
    if (err) {
      log.error('Failed to load a plugin', err);
      return;
    }
    log.info('{{ lname|capitalize }} devices manager started @ ' + server.info.uri);
  });
});
