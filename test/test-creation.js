/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var fs = require('fs');

var helpers = require('yeoman-generator').test;

var assert = require('chai').assert;
var cjson = require('cjson');
var ini = require('ini');

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
            '.eslintignore': 'json',
            '.jscsrc': 'cjson',
            '.editorconfig': 'ini',
            '.jshintrc': 'cjson',
            '.jshintignore': 'ini',
            '.sublimelinterrc': 'json',
            '.jsbeautifyrc': 'json'
        };

        helpers.mockPrompt(this.app, {
            tools: [
                'eslint',
                'jscs',
                'jshint',
                'editorconfig',
                'sublimelinter',
                'js-beautify'
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

                // no-default
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
