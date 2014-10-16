/*
 * Factory to create and return a new Muzzley Client Instance
 */
function Factory() {
  // Dependencies
  var config = require('config');
  var Muzzley = require('muzzley-client');

  var muzOptions = {
   reconnectionAttempts: Infinity, // Never give up trying to reconnect
   reconnectionLimit: 20000        // Retry reconnects at max 20s intervals
  };

  var muzzley = new Muzzley(muzOptions);

  return muzzley;
}

module.exports = Factory;