/* eslint  no-invalid-this:0 */
'use strict';
var path = require('path');
var fs = require('fs');

var helpers = require('yeoman-generator').test;
var yoAssert = require('yeoman-generator').assert;

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
                '../../app',
            ]);

            return done();

        }.bind(this));

    });

    var expected = {
        '.eslintrc.json': 'cjson',
        '.eslintignore': 'ini',
        '.editorconfig': 'ini',
        '.sublimelinterrc': 'json',
    };

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

    it('creates expected files with correct formats', function(done) {

        helpers.mockPrompt(this.app, {
            tools: [
                'eslint',
                'editorconfig',
                'sublimelinter',
            ],
            es2015: false,
        });

        this.app.options.skipInstall = true;
        this.app.run(function() {

            var expectedNames = Object.keys(expected);

            yoAssert.file(expectedNames);

            expectedNames.forEach(function(name) {

                checkFormat(name, expected[name]);

            });

            done();

        });

    });

    it('creates expected files with correct format when jsx', function(done) {

        helpers.mockPrompt(this.app, {
            tools: [
                'eslint',
                'editorconfig',
                'sublimelinter',
            ],
            es2015: true,
            react: true,
            mocha: true,
        });

        this.app.options.skipInstall = true;
        this.app.run(function() {

            var expectedNames = Object.keys(expected);

            yoAssert.file(expectedNames);
            expectedNames.forEach(function(name) {

                checkFormat(name, expected[name]);

            });

            done();

        });

    });

});
