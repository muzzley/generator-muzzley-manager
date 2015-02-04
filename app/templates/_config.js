var config = {};


/**
 * HTTP server configuration
 */
config.server = {
  host: 'https://your-manager-domain.com',
  port: 8080,
  options: {
    location: 'https://your-manager-domain.com'
  }
};


/**
 * Logger configuration
 * see https://github.com/trentm/node-bunyan
 * for more info
 *
 * default level: trace
 */
config.logger = {
  name: require('./package.json').name,
  level: 'debug'
};


/**
* Redis client connector configuration
* @type {Object}
*/
config.redis = {
  host: 'localhost',
  port: 6379
};


/**
 * muzzley ecosystem configuration
 */
config.muzzley = {
  app: {
    profile: '', // Go to https://muzzley.com/developers, create your APP and get this key
    token: ''  // Go to https://muzzley.com/developers, create your APP and get this key
  },
  api: {
    credential: '', // Go to https://muzzley.com/developers, create your APP and get this key
    url: 'http://channels.muzzley.com'
  }
};

module.exports = config;
