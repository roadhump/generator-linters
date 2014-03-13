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
            default: ['eslint', 'jscs', 'editorconfig'],
            choices: ['eslint', 'jshint', 'jscs', 'editorconfig']
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
            done();
        }.bind(this));
    },

    app: function() {

        var files = {
            'editorconfig': 'editorconfig',
            'jshint': 'jshintrc',
            'eslint': 'eslintrc',
            'jscs': 'jscs.json'
        };
        Object.keys(files).forEach(function(toolName) {
            if (this.opts.tools.indexOf(toolName) >= 0) {
                var fileName = files[toolName];
                this.copy(fileName, '.' + fileName);
            }
        }.bind(this));
    }
});
