'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({

    init: function() {
        this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));
    },

    askFor: function() {

        var done = this.async();
        var prompts = [{
            type: 'checkbox',
            name: 'tools',
            message: 'What JavaScript linter or tool should be used?',
            default: ['eslint', 'jscs', 'editorconfig', 'sublimelinter'],
            choices: ['eslint', 'jshint', 'jscs', 'editorconfig', 'sublimelinter']
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

        var files = {
            'editorconfig': ['editorconfig'],
            'jshint': ['jshintrc', 'jshintignore'],
            'eslint': ['eslintrc', 'eslintignore'],
            'jscs': ['jscsrc'],
            'sublimelinter': ['sublimelinterrc']
        };
        Object.keys(files).forEach(function(toolName) {
            if (this.opts.tools.indexOf(toolName) >= 0) {
                var fileNames = files[toolName];
                fileNames.forEach(function(fileName) {
                    this.copy(fileName, '.' + fileName);
                }.bind(this));
            }
        }.bind(this));
    }
});
