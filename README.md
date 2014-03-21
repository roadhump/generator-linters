# generator-linters 

My personal [Yeoman](http://yeoman.io) generator for linters and other code quality tools configurations.

## Overview

Now support

* [JSHint](http://jshint.com)
* [ESLint](http://eslint.org)
* [JSCS](https://github.com/mdevils/node-jscs)
* [EditorConfig](http://editorconfig.org)
* [SublimeLinter](http://sublimelinter.readthedocs.org)

## Installation

```
$ npm clone https://github.com/roadhump/generator-linters /path/to/linters
$ cd /path/to/linters
$ npm link
$ cd /path/to/myProject
$ yo linters
```

## ToDo

- [ ] add ignore files configuration
- [ ] do not override rules in environments
- [ ] add [beatutify-js](https://github.com/einars/js-beautify) support

## License

MIT
