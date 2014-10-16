var plugins = require('manager-framework').plugins;
var handlers = require('./handlers');

var plugin = {
  plugin: {
    plugin: plugins.images,
    options: {
      config: {
        handler: handlers.images()
      }
    }
  }
};

module.exports = plugin;
