var plugins = require('muzzley-idk').plugins;
var handlers = require('./handlers');

var plugin = {
  plugin: {
    plugin: plugins.channels,
    options: {
      config: {
        handler: handlers.getChannels
      }
    }
  }
};

module.exports = plugin;