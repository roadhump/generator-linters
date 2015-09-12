/* eslint global-require: 0 */
'use strict';
var assert = require('assert');

describe('linters generator', function() {

    it('can be imported without blowing up', function() {

        var app = require('../app');

        assert(typeof app !== 'undefined');

    });

});
