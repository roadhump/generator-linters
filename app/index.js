'use strict';
var path = require('path');
var fs = require('fs');

var chalk = require('chalk');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

    init: function() {

        this.pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json')));

        this.tools = {
            eslint: {
                title: 'ESLint',
                url: 'http://eslint.org',
                files: [{
                    from: '_eslint.json',
                    to: 'eslint.json'
                }, 'eslintignore'],
                isDefault: true
            },
            jshint: {
                title: 'JSHint',
                url: 'http://jshint.com',
                files: ['jshintrc', 'jshintignore'],
                isDefault: false
            },
            jscs: {
                title: 'JSCS',
                url: 'https://github.com/mdevils/node-jscs',
                files: ['jscsrc'],
                isDefault: true
            },
            editorconfig: {
                title: 'EditorConfig',
                url: 'http://editorconfig.org',
                files: ['editorconfig'],
                isDefault: true
            },
            sublimelinter: {
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
            },
            'scss-lint': {
                title: 'SCSS-Lint',
                url: 'https://github.com/causes/scss-lint',
                files: ['scss-lint.yml'],
                isDefault: false
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
            choices: ['browser', 'node', 'amd'],
            when: function(res) {

                return res.tools.indexOf('jshint') >= 0 || res.tools.indexOf('eslint') >= 0;

            }
        }, {
            type: 'confirm',
            name: 'es2015',
            message: 'Support of ES2015',
            default: true,
            when: function(res) {

                return res.tools.indexOf('eslint') >= 0 || res.tools.indexOf('jscs') >= 0;

            }
        }, {
            type: 'confirm',
            name: 'react',
            message: 'Support of React',
            default: false,
            when: function(res) {

                return res.tools.indexOf('eslint') >= 0 || res.tools.indexOf('jscs') >= 0;

            }
        }, {
            type: 'confirm',
            name: 'mocha',
            message: 'Support of Mocha',
            default: false,
            when: function(res) {

                return res.tools.indexOf('eslint') >= 0;

            }
        }, {
            type: 'list',
            name: 'indentStyle',
            message: 'Style of indent',
            default: 'space',
            choices: ['space', 'tab'],
            when: function(res) {

                return !(res.tools.length === 1 && res.tools[0] === 'sublimelinter');

            }
        }, {
            type: 'input',
            name: 'indentSize',
            message: 'Size of indent',
            default: 4,
            when: function(res) {

                return !(res.tools.length === 1 && res.tools[0] === 'sublimelinter');

            }
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
            }],
            when: function(res) {

                return ['eslint', 'jshint', 'jscs', 'scss-lint'].some(function(v) {

                    return res.tools.indexOf(v) >= 0;

                });

            }
        }];

        this.prompt(prompts, function(props) {

            this.opts = props;
            this.opts.excludes = [
                '**/node_modules/**',
                '**/bower_components/**',
                '**/vendor/**'
            ];
            this.opts.eslintPlugins = [];

            if (this.opts.react) {

                this.opts.eslintPlugins = this.opts.eslintPlugins.concat('react');

            }

            if (this.opts.mocha) {

                this.opts.eslintPlugins = this.opts.eslintPlugins.concat('mocha');

            }

            done();

        }.bind(this));

    },

    app: function() {

        this.opts.tools.forEach(function(toolName) {

            if (this.tools[toolName]) {

                var fileNames = this.tools[toolName].files;

                fileNames.forEach(function(fileName) {

                    if (typeof fileName === 'string') {

                        this.copy(fileName, '.' + fileName);

                    } else {

                        this.copy(fileName.from, fileName.to);

                    }

                }.bind(this));

            }

        }.bind(this));

    },

    install: function() {

        var installs = [
            this.opts.tools.indexOf('jshint') >= 0 ? 'jshint' : '',

            this.opts.tools.indexOf('jscs') >= 0 ? 'jscs' : '',
            (this.opts.tools.indexOf('jscs') >= 0 && (this.opts.react || this.opts.es2015)) ? 'esprima-fb' : '',

            this.opts.tools.indexOf('eslint') >= 0 ? 'eslint' : '',
            (this.opts.tools.indexOf('eslint') >= 0 && this.opts.es2015) ? 'babel-eslint' : ''
        ];

        this.opts.eslintPlugins.forEach(function(v) {

            installs = installs.concat('eslint-plugin-' + v);

        });

        this.npmInstall(installs, {'--save-dev': true});

    }

});
