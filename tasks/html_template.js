/*
 * grunt-html-template
 * https://github.com/allenice/grunt-html-template
 *
 * Copyright (c) 2014 Allenice
 * Licensed under the MIT license.
 */

'use strict';

var swig = require("swig"),
    path = require("path"),
    beautify_html = require("js-beautify").html;

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('html_template', 'html builder use swig template', function() {

      // get use config option, default options will be overwritten
      var options = this.options({
        cache: false
      });

      options.beautify = options.beautify || {};

      swig.setDefaults(options);

      this.files.forEach(function(f) {

        f.src.filter(function(filepath){
          var filename = path.basename(filepath);

          if(!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          } else if((/^_/).test(filename)) {
            return false;
          } else {
            return true;
          }

        }).map(function(filepath){
          var dest = f.dest.substring(0, f.dest.lastIndexOf('.')) + '.html';
          var src = path.resolve(filepath);

          grunt.log.writeln('writing file: ' + dest);

          grunt.file.write(
            dest,
            beautify_html(
              swig.renderFile(src, {}),
              options.beautify
            )
          );

          grunt.log.writeln('create file: ' + dest);
        });
      });
  });

};
