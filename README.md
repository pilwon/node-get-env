[![NPM](https://nodei.co/npm/get-env.png?downloads=false&stars=false)](https://npmjs.org/package/get-env) [![NPM](https://nodei.co/npm-dl/get-env.png?months=6)](https://npmjs.org/package/get-env)


# get-env

`get-env` is a tiny [Node.js](http://nodejs.org/) library returning either `dev` or `prod` based on `process.env.NODE_ENV`. Extra environments can be optionally added.


## Matching rules for `process.env.NODE_ENV`

* This library understands 2 default environments by default: `dev` and `prod`.
* `prod` is returned when any of the following values are set: `PROD`, `PRODUCTION`
* `dev` is returned when the value is empty or it has an unexpected value. (default environment)
* It always expects a case-insensitive value. (i.e. `NODE_ENV=prod` is equivalent to `NODE_ENV=PROD`)
* Extra environments can be optionally added in various methods. (see the usage section below)


## Installation

    $ npm install get-env


## Usage

```js
var env = require('get-env')();
```

This returns either `dev` or `prod`. (default environments)

Extra environments can be optionally added in addition to the default environments (`dev` and `prod`) with any of the following methods:

### 1. Pass a string

```js
var env = require('get-env')('test');
```

* Return `test` when the value is `TEST`.
* Otherwise, return `dev` or `prod`. (default rules apply)

### 2. Pass multiple strings as arguments or an array

```js
var env = require('get-env')('docker', 'test');
// OR
var env = require('get-env')(['docker', 'test']);
```

* Return `docker` when the value is `DOCKER`.
* Return `test` when the value is `TEST`.
* Otherwise, return `dev` or `prod`. (default rules apply)

### 3. Pass a plain object

```js
var env = require('get-env')({
  docker: 'DOCKER',  // or 'docker'
  test: ['TEST', 'TESTING'],  // or ['test', 'testing']
  prod: ['PR', 'PROD', 'PRODUCTION']  // or ['pr', 'prod', 'production']
});
```

* Return `docker` when the value is `DOCKER`.
* Return `test` when the value is `TEST` or `TESTING`.
* Return `prod` when the value is `PR`, `PROD`, or `PRODUCTION`. (default `prod` rules are overriden)
* Otherwise, return `dev`.


## Credits

  See the [contributors](https://github.com/pilwon/node-get-env/graphs/contributors).


## License

<pre>
The MIT License (MIT)

Copyright (c) 2014 Pilwon Huh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
</pre>

[![Analytics](https://ga-beacon.appspot.com/UA-47034562-23/node-get-env/readme?pixel)](https://github.com/pilwon/node-get-env)
