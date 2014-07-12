/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var fs = require('fs');

var helpers = require('yeoman-generator').test;

var assert = require('chai').assert;
var cjson = require('cjson');
var ini = require('ini');
var yaml = require('js-yaml');

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

    it('creates expected files with correct formats', function(done) {
        var expected = {
            '.eslintrc': 'cjson',
            '.eslintignore': 'ini',
            '.jscsrc': 'cjson',
            '.editorconfig': 'ini',
            '.jshintrc': 'cjson',
            '.jshintignore': 'ini',
            '.sublimelinterrc': 'json',
            '.jsbeautifyrc': 'json',
            '.scss-lint.yml': 'yaml'
        };

        helpers.mockPrompt(this.app, {
            tools: [
                'eslint',
                'jscs',
                'jshint',
                'editorconfig',
                'sublimelinter',
                'js-beautify',
                'scss-lint'
            ]
        });

        var checkFormat = function(filename, format) {
            switch (format) {
                case 'cjson':
                    assert.doesNotThrow(function() {
                        cjson.load(filename);
                    });
                    break;

                case 'json':
                    assert.doesNotThrow(function() {
                        JSON.parse(fs.readFileSync(filename));
                    });
                    break;

                case 'ini':
                    assert.doesNotThrow(function() {
                        ini.decode(fs.readFileSync(filename).toString());
                    });
                    break;

                case 'yaml':
                    assert.doesNotThrow(function() {
                        yaml.safeLoad(fs.readFileSync(filename).toString());
                    });
                    break;

                    // no default
            }
        };

        this.app.run({}, function() {
            var expectedNames = Object.keys(expected);
            helpers.assertFile(expectedNames);

            expectedNames.forEach(function(name) {
                checkFormat(name, expected[name]);
            });

            done();
        });
    });
});
