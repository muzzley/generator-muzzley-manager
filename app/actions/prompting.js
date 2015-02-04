
var greeting = require('../utils/greeting');

module.exports = function () {
  var done = this.async();

  // Greet the user.
  this.log(greeting());

  var prompts = [
    {
      type: 'input',
      name: 'deviceName',
      message: 'What is the name of the device?'
    }
  ];

  this.prompt(prompts, function (props) {
    this.deviceName = props.deviceName;
    
    done();
  }.bind(this));
};
