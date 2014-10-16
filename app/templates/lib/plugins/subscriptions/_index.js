var plugins = require('manager-framework').plugins;
var handlers = require('./handlers');

var plugin = {
  plugin: {
    plugin: plugins.subscriptions,
    options: {
      config: {
        handler: handlers.subscribe
      }
    }  
  }
};


module.exports = plugin;