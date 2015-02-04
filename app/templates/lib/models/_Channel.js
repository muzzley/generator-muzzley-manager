// Dependency
var Model = require('muzzley-idk').helpers.Model;


var Channel = Model.extend({
  name: 'channel',
  props: {
    id: 'number',
    name: 'string'
  },
  keys: ['id']
});


Channel.getAll = function(cb) {
  return Channel.mget({id: '*'}, cb);
};

module.exports = Channel;
