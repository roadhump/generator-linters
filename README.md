[![Build Status](https://travis-ci.org/roadhump/generator-linters.svg?branch=master)](https://travis-ci.org/roadhump/generator-linters)

[![NPM version](https://badge.fury.io/js/generator-linters.svg)](http://badge.fury.io/js/generator-linters)

# generator-linters 

[Yeoman](http://yeoman.io) generator for JavaScript linters and other code quality tools configurations.

## Overview

Now support

* [JSHint](http://jshint.com)
* [ESLint](http://eslint.org)
* [JSCS](https://github.com/mdevils/node-jscs)
* [EditorConfig](http://editorconfig.org)
* [SublimeLinter](http://sublimelinter.readthedocs.org)
* [JS Beautifier](http://jsbeautifier.org)
* [SCSS-Lint](https://github.com/causes/scss-lint)

## Installation

```
$ npm install -g generator-linters
$ yo linters
```

## Notes

It seems that only one Sublime Text plugin [JsFormat](https://github.com/jdc0589/JsFormat) works correct with generated `.jsbeautifyrc` file, so I suggest to use it if Sublime Text is your editor.

## License

MIT
