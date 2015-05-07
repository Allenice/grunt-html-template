# grunt-html-template

> Html builder use swig template. You can use swig template feature to generate html page.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-html-template --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-html-template');
```

## The "html_template" task

### Overview
In your project's Gruntfile, add a section named `html_template` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    html_template: {
        options: {
            locals:  {
                title: "Allenice"
            },
            beautify: {
                indent_size: 2
            }
        },
        build_html: {
	        options: {
				force: false
			},
            expand: true,
            cwd: "test/demo/tpl",
            src: "**/*.tpl",
            dest: "test/demo/www"
        }
    },
});
```

if your template filename begin with '_', it will not be compiled.

### Options
1. You can use all options of [swig](http://paularmstrong.github.io/swig/docs/api/). By default, cache is set to false.
2. You can use options of [js-beautify](https://www.npmjs.org/package/js-beautify) in beautify property.
3. You can set {force : false} in order to compile files which has changed.


### Usage Examples

#### default options

```js
grunt.initConfig({
    html_template: {
        dev: {
            options: {
	            force: true,
                autoescape: ture,
                cache: "false",
                varControls: ['{{', '}}'],
                tagControls: ['{%', '%}'],
                cmtControls: ['{#', '#}'],
                locals:  {},
                cache: false,
                loader: swig.loaders.fs,
                beautify: {
                    indent_size: 4,
                    indent_char: " ",
                    indent_with_tabs: false,
                    preserve_newlines: true,
                    max_preserve_newlines: 10,
                    wrap_line_length: 0,
                    indent_inner_html: false,
                    brace_style: "collapse"
                }
            },
            expand: true,
            cwd: "test/demo/tpl",
            src: "**/*.tpl",
            dest: "test/demo/www"
        }
    },
});
```
