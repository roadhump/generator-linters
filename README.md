# generator-linters 

> [Yeoman](http://yeoman.io) generator

# Overview

My personal generator for linters and other code quality tools configurations.

Now support

* [jshint](http://jshint.com)
* [eslint](http://eslint.org)
* [jscs](https://github.com/mdevils/node-jscs)
* [editorconfig](http://editorconfig.org)

```
$ npm clone https://github.com/roadhump/generator-linters /path/to/linters
$ cd /path/to/linters
$ npm link
$ cd /path/to/MyProject
$ yo linters
```

## ToDo

- [ ] add ignore files configuration
- [ ] do not override rules in environments
- [ ] add [beatutify-js](https://github.com/einars/js-beautify) support

## License

MIT
