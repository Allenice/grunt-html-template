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
    fs = require('fs'),
    beautify_html = require("js-beautify").html;

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('html_template', 'html builder use swig template', function(target) {

    // get use config option, default options will be overwritten
    var options = this.options({
      cache: false,
      force: true // compile all files
    });

    options.beautify = options.beautify || {};
  
    swig.setDefaults(options);

    var now = Date.now(),
        changeFiles = [],
        files = [],
        compileAll = false;

    this.files.forEach(function(f) {
      var filepath = f.src[0],
          filename = path.basename(filepath),
          isPartial = (/^_/).test(filename),
          stat;

      if(!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" not found.');
        return;
      }

      // store file which is not start with '_'
      if(!isPartial) {
        files.push(f);
      }

      // check file is change
      stat = fs.statSync(path.resolve(filepath));
      if(now - stat.mtime.getTime() < 5000 || options.force) {
        if(isPartial) {
          // the changed file is start with '_', and will compile all files
          compileAll = true;
          return;
        }
        changeFiles.push(f);
      }

    });

    changeFiles = compileAll ? files : changeFiles;
    changeFiles.forEach(function (f) {
      var dest = f.dest.substring(0, f.dest.lastIndexOf('.')) + '.html';
      var src = path.resolve(f.src[0]);

      try {
        grunt.file.write(
          dest,
          beautify_html(
            swig.renderFile(src, {}),
            options.beautify
          )
        );
      }catch (e) {
        grunt.fail.fatal (e);
      }

      grunt.log.writeln('write file: ' + dest);
    });

  });

};
