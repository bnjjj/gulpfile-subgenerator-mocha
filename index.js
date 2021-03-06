'use strict';
var generators = require('yeoman-generator');
var _ = require('lodash');

var gulpfileGenerator = module.exports = generators.Base.extend({
  initializing: function () {
    this.vars = {};
  },

  prompting: function () {
    var self = this;
    var done = self.async();

    self.prompt([{
      type: 'value',
      name: 'src',
      message: 'What is the relative path to your js test files (mocha)?',
      default: './app/**/*.spec.js'
    }, {
      type: 'value',
      name: 'srcWatch',
      message: 'What is the relative path to the files for watching and launch testing (mocha)?',
      default: './app/**/*.js'
    }, {
      type: 'value',
      name: 'notify',
      message: 'Do you want to be notified (growl) when you have an error in your tests (mocha)?',
      default: 'yes'
    }], function (answers) {
      answers.concat = answers.notify.indexOf('no') !== -1 ? false : true;
      _.assign(self.vars, answers);
      done();
    });
  },

  writing: function () {
    var self = this;

    self.template(self.templatePath(), self.destinationPath('./gulp-scripts'), self.vars);
  },

  install: function () {
    var self = this;

    self.installDependencies();
    self.npmInstall(['gulp-notify', 'gulp-mocha'], { 'saveDev': true });
  },

  end: function () {

  }
});
