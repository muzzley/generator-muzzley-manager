var path = require('path');

module.exports = function(grunt) {
  
  // Array with 'Yes' and 'No'
  // answer
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
  
  // Start grunt config
  grunt.initConfig({
    prompt: {
      upstart: {
        options: {
          questions: [
            {
              config: 'upstart', 
              type: 'list', 
              message: 'Do you want to use upstart?',
              choices: choicesBoolean,
              default: true 
            }
          ]
        }      
      },
      logrotate: {
        options: {
          questions: [
            {
              config: 'logrotate', 
              type: 'list', 
              message: 'Do you want to use logrotate?',
              choices: choicesBoolean,
              default: true 
            }
          ]
        }      
      },
      logs: {
        options: {
          questions: [
            {
              when: function() {
                return this.initStarted;
              }.bind(this),
              config: 'logPath', 
              type: 'input', 
              message: 'Can you give me the absolute path where you store the logs?',
              default: '/var/log/muzzley/devicesManager' 
            }
          ]
        }
      }
    },
    imagemin: {                          
      dynamic: {                         
        files: [{
          expand: true,                  
          cwd: 'public/',                   
          src: ['**/*.{png,jpg,gif}'],   
          dest: 'dist/'                  // Destination path prefix
        }]
      }
    }    
  });
  
  // Variable to only show log question
  // when grunt init is called
  this.initStarted = false;

  /**
   * Grunt task to make promp:logs available
   */  
  grunt.registerTask('initStart', function() {
    this.initStarted = true;
  }.bind(this));
  
  
  /**
   * Write log path in production files and copy
   * them from _template to their dirs
   */
  grunt.registerTask('writeProductionFiles', function() {
    // Get device name from the path
    var deviceName = __dirname.split('/');
    deviceName = deviceName[deviceName.length-1];
    deviceName = deviceName.replace('manager-', '');
    
    // Remove last trailing slash if it exists
    var logPath = grunt.config('logPath');
    logPath = logPath.replace(/\/$/, '');
    
    // Read production template files
    var upstart = grunt.file.read(path.join(__dirname, 'production/_template/'+deviceName+'_upstart.conf'), { encoding: 'utf8'});
    var logrotate = grunt.file.read(path.join(__dirname, 'production/_template/'+deviceName+'_logrotate'), { encoding: 'utf8'});
    
    // Switch logPath with path user gave in the prompt
    upstart = upstart.replace(/{logPath}/g, logPath);
    logrotate = logrotate.replace(/{logPath}/g, logPath);
    
    // Switch currentPath with the current path of the manager
    upstart = upstart.replace(/{currentPath}/g, __dirname);
    
    // Write modifications of the files to their dirs
    grunt.file.write(path.join(__dirname, 'production/upstart/'+deviceName+'.conf'), upstart, {encoding: 'utf8'});
    grunt.file.write(path.join(__dirname, 'production/logrotate/'+deviceName), logrotate, {encoding: 'utf8'});
    
  });  
  
  // Load plugins
  grunt.loadNpmTasks('grunt-shell');  
  grunt.loadNpmTasks('grunt-prompt');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  
  // Register multi-tasks
  grunt.registerTask('init', ['initStart', 'prompt:logs', 'writeProductionFiles']);
  grunt.registerTask('deploy', ['prompt', 'upstart']);

};