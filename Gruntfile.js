/*
 * grunt-html-template
 * https://github.com/allenice/grunt-html-template
 *
 * Copyright (c) 2014 Allenice
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Configuration to be run (and then tested).
    html_template: {
      options: {
        locals:  require('./locals'),
        beautify: {
          indent_size: 2
        }
      },
      dev: {
        options: {
          force: false
        },
        expand: true,
        cwd: "test/demo/tpl",
        src: "**/*.tpl",
        dest: "test/demo/www"
      },
      build: {
        expand: true,
        cwd: "test/demo/tpl",
        src: "**/*.tpl",
        dest: "test/demo/www"
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

    watch: {
      html: {
        files: ['test/demo/**/*.tpl'],
        tasks: ['html_template:dev']
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['html_template', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

  grunt.registerTask('html', ['html_template:build', 'watch:html']);

};
