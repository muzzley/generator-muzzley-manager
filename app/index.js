'use strict';
var yeoman = require('yeoman-generator');

var MuzzleyManagerGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },
  
  prompting: require('./actions/prompting'),

  writing: require('./actions/writing'),

  end: function () {
    var done = this.async();
  
    // Install manager-framework and muzzley-client
    this.installDependencies({bower : false});
    
    // Install the rest of the dependencies
    this.npmInstall(
    [
      'hapi',
      'boom',
      'joi',
      'request',
      'lab',
      'lodash',
      'grunt',
      'grunt-shell',
      'grunt-prompt',
      'grunt-contrib-imagemin',
      'async',
      'qrcode-terminal'
    ], 
    { 'save': true }, 
    function() {
      if(this.localProviderModule) {
        done();
      } else {
        this.npmInstall(
        [
          this.thirdPartyProviderModule
        ], 
        { 'save': true }, 
        done);
      }
    }.bind(this));
  }
});

module.exports = MuzzleyManagerGenerator;
