// Dependency
var Model = require('muzzley-idk').helpers.Model;

var Credentials = Model.extend({
  name: 'credentials',
  props: {
    muzzleyId: 'string',
    providerId: 'string',
    accessToken: 'string'
  },
  keys: ['muzzleyId', 'providerId']
});


module.exports = Credentials;
