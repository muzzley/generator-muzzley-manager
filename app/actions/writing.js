// Dependencies
var path = require('path');
var swig = require('swig');

module.exports = {
  initializing: function() {
    // create the dir name
    this.dirLocation = 'manager-'+this.deviceName;

    // Make dir
    this.dest.mkdir(this.dirLocation);

    // Change dir
    process.chdir(this.dirLocation);

    // Define template vars
    this.swigVars = {
      uname: this.deviceName.toUpperCase(),
      lname: this.deviceName.toLowerCase(),
      localProviderModule: this.localProviderModule,
      providerModule: this.thirdPartyProviderModule ? this.thirdPartyProviderModule : ''
    };

    this.swig = function(origin, destination) {
      var file = this.readFileAsString(path.join(this.sourceRoot(), origin));
      this.dest.write(destination, swig.render(file, { locals: this.swigVars}) );
    };
  },
  package: function() {
    var packageJSON = this.src.readJSON('_package.json');
    packageJSON.name = this.dirLocation;

    if(this.localProviderModule) {
      packageJSON.scripts.preinstall = "npm install --prefix ./provider_module/";
      packageJSON.scripts.preupdate = "npm update --prefix ./provider_module/";
    }

    this.dest.write('package.json', swig.render(JSON.stringify(packageJSON, null, 4), { locals: this.swigVars}));
  },

  structure: function () {
    // Copy root files
    this.swig('_index.js', 'index.js');
    this.swig('_config.js', 'config.js');

    // Build the app structure
    this.dest.mkdir('public');
    this.dest.mkdir('public/images');
    this.dest.mkdir('test');
    this.dest.mkdir('lib');
    this.dest.mkdir('lib/interaction');
    this.dest.mkdir('lib/plugins');
    this.dest.mkdir('lib/factory');
    this.dest.mkdir('lib/models');
    this.dest.mkdir('lib/provider');

    // Copy lib files & make lib dirs
    this.src.copy('lib/plugins/_index.js', 'lib/plugins/index.js');

    this.dest.mkdir('lib/plugins/auth');
    this.src.copy('lib/plugins/auth/_handlers.js', 'lib/plugins/auth/handlers.js');
    this.swig('lib/plugins/auth/_index.js', 'lib/plugins/auth/index.js');

    this.dest.mkdir('lib/plugins/channels');
    this.src.copy('lib/plugins/channels/_handlers.js', 'lib/plugins/channels/handlers.js');
    this.src.copy('lib/plugins/channels/_index.js', 'lib/plugins/channels/index.js');

    this.dest.mkdir('lib/plugins/images');
    this.src.copy('lib/plugins/images/_handlers.js', 'lib/plugins/images/handlers.js');
    this.src.copy('lib/plugins/images/_index.js', 'lib/plugins/images/index.js');

    this.dest.mkdir('lib/plugins/subscriptions');
    this.swig('lib/plugins/subscriptions/_handlers.js', 'lib/plugins/subscriptions/handlers.js');
    this.src.copy('lib/plugins/subscriptions/_index.js', 'lib/plugins/subscriptions/index.js');

    // Copy interactions files
    this.src.copy('lib/interaction/_index.js', 'lib/interaction/index.js');

    // Copy factory
    this.src.copy('lib/factory/_api.js', 'lib/factory/api.js');
    this.src.copy('lib/factory/_log.js', 'lib/factory/log.js');
    this.src.copy('lib/factory/_muzzleyClient.js', 'lib/factory/muzzleyClient.js');

    // Copy models
    this.src.copy('lib/models/_Channel.js', 'lib/models/Channel.js');
    this.src.copy('lib/models/_Credentials.js', 'lib/models/Credentials.js');
    this.src.copy('lib/models/_Subscription.js', 'lib/models/Subscription.js');
    this.swig('lib/models/_keys.js', 'lib/models/keys.js');

    // Copy images
    this.src.copy('public/images/channels.jpg', 'public/images/channels.jpg');
    this.src.copy('public/images/profile.jpg', 'public/images/profile.jpg');

    // Write provider wrapper
    this.swig('lib/provider/_index.js', 'lib/provider/index.js');

    if(this.localProviderModule) {
      // Create local provider module structure
      this.dest.mkdir('provider_module');
      this.src.copy('provider/_package.json', 'provider_module/package.json');
      this.src.copy('provider/_index.js', 'provider_module/index.js');
      this.dest.mkdir('provider_module/lib');
      this.src.copy('provider/lib/_index.js', 'provider_module/lib/index.js');
      this.dest.mkdir('provider_module/test');
      this.dest.mkdir('provider_module/docs');
    }
  }
};
