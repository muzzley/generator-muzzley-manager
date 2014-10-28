var config = {};


/**
 * HTTP server configuration
 */
config.server = {
  host: 'localhost',
  images: {
    firstPost: '/images/first.jpg',
    posts: []
  },
  port: 8080,
  options: {}
};


/**
 * Logger configuration 
 * see https://github.com/trentm/node-bunyan
 * for more info
 * 
 * default level: trace
 */
config.bunyan = {
  name: require('./package.json').name,
  level: 'trace'
};


/**
 * Muzzley ecosystem configuration
 */
config.muzzley = {
  activity: {
    token: '',
    activityId: ''
  },
  webview: '',
  // You need to contact our support at support@muzzley.com
  // to get the credentials  
  api: {
    credentials : {
      id: '',
      key: ''
    },
    url: 'https://channels.muzzley.com'
  }
};
  
module.exports = config;