
var greeting = require('../utils/greeting');

module.exports = function () {
  var done = this.async();

  // Greet the user.
  this.log(greeting());

  var choicesBoolean = [
    {
      name: 'Yes',
      value: true
    },
    {
      name: 'No',
      value: false
    }          
  ];

  var prompts = [
    {
      type: 'input',
      name: 'deviceName',
      message: 'What is the name of the device?'
    },
    {
      type: 'list',
      name: 'useThirdPartyProviderModule',
      message: 'Do you want to use a third-party module for the provider logic?',
      choices: choicesBoolean
    },
    {
      when: function (answers) {
        return answers.useThirdPartyProviderModule;
      },
      type: 'input',
      name: 'nameThirdPartyProviderModule',
      message: 'Can you give me the name of the third-party module?'
    },
    {
      when: function (answers) {
        return !answers.useThirdPartyProviderModule;
      },
      type: 'list',
      name: 'localProviderModule',
      message: 'Do you want to build a local provider module?',
      choices: choicesBoolean
    }
  ];

  this.prompt(prompts, function (props) {
    this.deviceName = props.deviceName;
    
    if(props.useThirdPartyProviderModule) {
      this.thirdPartyProviderModule = props.nameThirdPartyProviderModule;
      this.localProviderModule = false;
    } else {
      this.localProviderModule = props.localProviderModule;
    }
    
    done();
  }.bind(this));
};
