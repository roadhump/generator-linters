/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('linters generator', function() {
    beforeEach(function(done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('linters:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function(done) {
        var expected = [
            '.eslintrc',
            '.eslintignore',
            '.jscsrc',
            '.editorconfig',
            '.jshintrc',
            '.jshintignore',
            '.sublimelinterrc'
        ];

        helpers.mockPrompt(this.app, {
            tools: [
                'eslint',
                'jscs',
                'jshint',
                'editorconfig',
                'sublimelinter'
            ]
        });
        this.app.run({}, function() {
            helpers.assertFile(expected);
            done();
        });
    });
});
