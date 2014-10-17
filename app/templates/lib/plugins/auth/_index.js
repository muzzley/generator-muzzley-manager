// Dependencies
var config = require('config');
var plugins = require('muzzley-idk').plugins;
var handlers = require('./handlers');


var plugin = {

  plugin: {

    plugin: plugins.auth,

    options: {
      url: config.server.host,
      auth: {
        title: '{{ lname|capitalize }}:login',
        subtitle: 'Insert your account details',
        label: 'Sign in',
        inputs:  {
          'email': { type: 'text',  placeholder: 'Email' },
          'password': { type: 'password', placeholder: 'Password' }
        },
        config: {
          handler: handlers.login
        }
      },
      authz: {
        title: '{{ lname|capitalize }}:Authorize',
        subtitle: 'Insert your account details',
        label: 'Sign in',
        permissions: {
          available: ['Read your profile'],
          unavailable: ['Add data', 'Modify your data', 'Modify or delete some profile information']
        },
        config: {
          handler: handlers.authorization
        }
      }
    }
  },

  options: {
    route: {
      prefix: '/authorization'
    }
  }
};


module.exports = plugin;