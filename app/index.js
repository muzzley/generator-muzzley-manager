'use strict';
var yeoman = require('yeoman-generator');
var path = require('path');

var MuzzleyManagerGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: require('./actions/prompting'),

  writing: require('./actions/writing'),

  end: function () {
    var done = this.async();


    // Install the main dependencies of the manager
    this.npmInstall(
    [
      'muzzley-idk',
      'muzzley-client',
      'hapi@7.5.2',
      'boom',
      'async'
    ],
    { 'save': true },
    function() {
      // Change to provider_module dir
      process.chdir(path.join(process.cwd(), 'provider_module'));

      // Install the dependency of provider_module
      this.npmInstall(['request'], {'save': true}, function() {
        return done();
      });
    }.bind(this));
  }
});

module.exports = MuzzleyManagerGenerator;
