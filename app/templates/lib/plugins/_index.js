// Hapi Plugins
var authPlugin = require('./auth');
var channelsPlugin = require('./channels');
var subscriptionsPlugin = require('./subscriptions');
var imagesPlugin = require('./images');

module.exports = [
  authPlugin,
  channelsPlugin,
  subscriptionsPlugin,
  imagesPlugin
];
