'use strict';
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

    init: function() {
        this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

        this.tools = {
            'eslint': {
                title: 'ESLint',
                url: 'http://eslint.org',
                files: ['eslintrc', 'eslintignore'],
                isDefault: true
            },
            'jshint': {
                title: 'JSHint',
                url: 'http://jshint.com',
                files: ['jshintrc', 'jshintignore'],
                isDefault: false
            },
            'jscs': {
                title: 'JSCS',
                url: 'https://github.com/mdevils/node-jscs',
                files: ['jscsrc'],
                isDefault: true
            },
            'editorconfig': {
                title: 'EditorConfig',
                url: 'http://editorconfig.org',
                files: ['editorconfig'],
                isDefault: true
            },
            'sublimelinter': {
                title: 'SublimeLinter',
                url: 'http://sublimelinter.readthedocs.org',
                files: ['sublimelinterrc'],
                isDefault: true
            },
            'js-beautify': {
                title: 'JS Beautifier',
                url: 'http://jsbeautifier.org',
                files: ['jsbeautifyrc'],
                isDefault: true
            }
        };
    },

    askFor: function() {

        var done = this.async();

        var toolsChoices = Object.keys(this.tools).map(function(name) {

            var tool = this.tools[name];
            return {
                name: tool.title + ' ' + chalk.gray(tool.url),
                value: name
            };
        }.bind(this));

        var toolsDefaults = Object.keys(this.tools).reduce(function(defaults, name) {

            if (this.tools[name].isDefault) {
                defaults.push(name);
            }
            return defaults;
        }.bind(this), []);

        var prompts = [{
            type: 'checkbox',
            name: 'tools',
            message: 'What JavaScript linter or tool should be used?',
            default: toolsDefaults,
            choices: toolsChoices
        }, {
            type: 'checkbox',
            name: 'environments',
            message: 'Choose JavaScript environments',
            default: ['browser'],
            choices: ['browser', 'node', 'amd']
        }, {
            type: 'list',
            name: 'indentStyle',
            message: 'Style of indent',
            default: 'space',
            choices: ['space', 'tab']
        }, {
            type: 'input',
            name: 'indentSize',
            message: 'Size of indent',
            default: 4
        }, {
            type: 'list',
            name: 'quotes',
            message: 'Type of quotes',
            default: 'single',
            choices: [{
                name: 'both',
                value: 'both'
            }, {
                name: 'single',
                value: 'single'
            }, {
                name: 'double',
                value: 'double'
            }]
        }];

        this.prompt(prompts, function(props) {

            this.opts = props;
            this.opts.excludes = [
                '*/node_modules/**',
                '*/bower_components/**',
                '*/vendor/**'
            ];
            done();
        }.bind(this));
    },

    app: function() {

        this.opts.tools.forEach(function(toolName) {

            var fileNames = this.tools[toolName].files;
            fileNames.forEach(function(fileName) {
                this.copy(fileName, '.' + fileName);
            }.bind(this));
        }.bind(this));
    }
});
