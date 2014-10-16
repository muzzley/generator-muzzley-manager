var config = {};


/**
 * HTTP server configuration
 */
config.server = {
  host: process.env.MANAGER_{{ uname }}_HOST || '',
  images: {
    firstPost: '/images/first.jpg',
    posts: []
  },
  port: process.env.MANAGER_{{ uname }}_PORT || 8080,
  options: {}
};


/**
 * Logger configuration 
 * see https://github.com/trentm/node-bunyan
 * for more info
 */
config.bunyan = {
  name: require('./package.json').name,
  level: process.env.MANAGER_{{ uname }}_LOG_LEVEL || 'trace'
};


/**
 * Muzzley ecosystem configuration
 */
config.muzzley = {
  activity: {
    token: process.env.MANAGER_{{ uname }}_TOKEN || '',
    activityId:  process.env.MANAGER_{{ uname }}_ACTIVITY || '',
    authStrategy: process.env.MANAGER_{{ uname }}_AUTH_STRATEGY || 'internal' 
  },
  webview: process.env.MANAGER_{{ uname }}_WEBVIEW_UUID || '',
  // You need to contact our support at support@muzzley.com
  // to get the credentials and the url  
  api: {
    credentials : {
      id: process.env.MANAGER_{{ uname }}_ID || '',
      key: process.env.MANAGER_{{ uname }}_HAWK_KEY || ''
    },
    url: process.env.MANAGER_{{ uname }}_MUZZLEY_API || ''
  }
};
  
module.exports = config;