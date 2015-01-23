'use strict';
var chalk = require('chalk');
var version = require('../../package.json').version;

function returnGreeting() {
  var greeting =
  '\n                            ' + chalk.red.bold('mdddhhhhhhhhdddm') +
  '\n                        ' + chalk.red.bold('dhhhhhhhhhhhhhhhhhhhhhhd')+
  '\n                     ' + chalk.red.bold('dhhhhhhhhhhhhhhhhhhhhhhhhhhhhd') +
  '\n                  ' + chalk.red.bold('mhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhm') +
  '\n                ' + chalk.red.bold('mhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhm') +
  '\n               ' + chalk.red.bold('dhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhd') +
  '\n              ' + chalk.red.bold('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh') +
  '\n             ' + chalk.red.bold('hhhhhhhhhhhhhhhssyhhhhhhhssyhhhhhhhysyhhhhhhhh') +
  '\n            ' + chalk.red.bold('dhhhhhhhhhhhhh/    .shhh+`   .shhho`   .shhhhhhd') +
  '\n            ' + chalk.red.bold('hhhhhhhhhhhhh:      :hh/      -hh+      -hhhhhhh') +
  '\n           ' + chalk.red.bold('dhhhhhhhhhhhy-      .yh:      `yh/      `shhhhhhhd')+
  '\n           ' + chalk.red.bold('hhhhhhhhhhhy.      -yh-      .yh:      `shhhhhhhhh')+
  '\n           ' + chalk.red.bold('hhhhhhhhhhy.      -hy.      .yh-      .yhhhhhhhhhh')+
  '\n           ' + chalk.red.bold('hhhhhhhhhs`      :hy.      -hy-      .yhhhhhhhhhhh')+
  '\n           ' + chalk.red.bold('dhhhhhhhs`      /hy`      :hy.      -yhhhhhhhhhhhd')+
  '\n           ' + chalk.red.bold('mhhhhhhh.      +hh-      /hh:      :hhhhhhhhhhhhhm')+
  '\n            ' + chalk.red.bold('dhhhhhhs.   `ohhhs.   `+hhhs.    /hhhhhhhhhhhhhd') +
  '\n             ' + chalk.red.bold('hhhhhhhhysyhhhhhhhysshhhhhhhyosyhhhhhhhhhhhhhh') +
  '\n              ' + chalk.red.bold('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh') +
  '\n               ' + chalk.red.bold('dhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhd') +
  '\n                ' + chalk.red.bold('mhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhm') +
  '\n                  ' + chalk.red.bold('mhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhm') +
  '\n                     ' + chalk.red.bold('dhhhhhhhhhhhhhhhhhhhhhhhhhhhhd') +
  '\n                       ' + chalk.red.bold('mdhhhhhhhhhhhhhhhhhhhhhhdm') +
  '\n                            ' + chalk.red.bold('mddhhhhhhhhhhddm') +
  '\n'+
  '\n'+
  '\n                       .--------------------------.'+
  '\n                       |    Welcome to Muzzley    |'+
  '\n                       |    Manager generator!    |'+
  '\n                       |         v'+version+'           |'+
  "\n                       '--------------------------'";

  return greeting;
}

module.exports = returnGreeting;
