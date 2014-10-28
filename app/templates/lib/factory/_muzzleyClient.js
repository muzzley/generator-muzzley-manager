/*
 * Factory to create and return a new Muzzley Client Instance
 */
function Factory() {
  // Dependencies
  var Muzzley = require('muzzley-client');

  var options = {
   reconnectionAttempts: Infinity, // Never give up trying to reconnect
   reconnectionLimit: 20000        // Retry reconnects at max 20s intervals
  };

  var muzzley = new Muzzley(options);

  return muzzley;
}

module.exports = Factory;