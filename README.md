[![NPM](https://nodei.co/npm/get-env.png?downloads=false&stars=false)](https://npmjs.org/package/get-env) [![NPM](https://nodei.co/npm-dl/get-env.png?months=6)](https://npmjs.org/package/get-env)


# get-env

`get-env` is a [Node.js](http://nodejs.org/) library returning `dev`, `prod`, or optional extra environments based on `process.env.NODE_ENV`.

* [get-config](https://github.com/pilwon/node-get-config) uses this library to parse `process.env.NODE_ENV`.


## Why use this library?

Many people use the following simple line of code, but there are some disadvantages to this approach:

    const env = process.env.NODE_ENV || 'development';

1. If your code tests against, `development` and `production` (for example), then you must only use those values for `NODE_ENV`. `get-env` library accepts multiple alternative values as rules for an environment, therefore you can make unlimited number of aliases to the same environment same. This lets you forget about the exact string value you used in your code, which means you can use whatever value that comes naturally to your mind whenever you switch environments. All environment names matched by this library are case-insensitive as well.

2. If you supply an unregistered value for `NODE_ENV` (for example, `productoin` instead of `production` -- that is a typo), the `env` variable is now set to this wrong value and the rest of code that tests against this variable would have an unexpected behavior. This library fixes this problem by throwing an error on unregistered and non-empty value set to `NODE_ENV`. An empty value is resolved to `dev` environment.

3. If you start adding more extra environments (ex: staging, test, etc.) then it won't be a simple one line of code anymore. This library provides consistent, straightforward, and flexible extra environment addition methods therefore you can freely add or remove environments with minimal overhead in your code while keeping all the above mentioned benefits.

Basically, this library provides a consistent, reliable, scalable way to parse the `NODE_ENV` environment variable so it is ready for you to use from an app targetting multiple environments.


## Examples

The following single line of code ...

```js
const env = require('get-env')();
```

... is equivalent to ...

```js
const nodeEnv = (process.env.NODE_ENV || '').toLowerCase();
var env;
if (nodeEnv === 'prod' || nodeEnv === 'production') {
  env = 'prod';
} else if (nodeEnv === 'dev' || nodeEnv === 'development' || nodeEnv === '') {
  env = 'dev';
} else {
  throw new Error('Unknown environment name: NODE_ENV=' + nodeEnv);
}
```

For slightly more complex example, the following lengthy code ...

```js
const nodeEnv = process.env.NODE_ENV;
var env;
if (nodeEnv === 'production' || nodeEnv === 'prod') {
  env = 'prod';
} else if (nodeEnv === 'staging') {
  env = 'staging';
} else if (nodeEnv === 'test' || nodeEnv === 'testing') {
  env = 'test';
} else if (nodeEnv === 'dev' || nodeEnv === 'development' || !nodeEnv) {
  env = 'dev';
} else {
  throw new Error('Unknown environment name: NODE_ENV=' + nodeEnv);
}
```

... can be simplified to ...

```js
const env = require('get-env')({
  staging: 'staging',
  test: ['test', 'testing']
});
```


## Matching rules for `process.env.NODE_ENV`

* There are 2 pre-registered environments: `dev` and `prod`.
* `prod` is returned when any of the following values are set: `prod`, `production`
* `dev` is returned when the value is empty (default environment) or any of the following values are set: `dev`, `development`
* It throws an error when the value is unregistered and non-empty. (catches typos)
* It always expects a case-insensitive value. (i.e. `NODE_ENV=PROD` is equivalent to `NODE_ENV=prod`)
* Extra environments can be optionally added in various methods. (see the usage section below)


## Installation

    $ npm install get-env


## Usage

```js
const env = require('get-env')();
```

This returns either `dev` or `prod`. (pre-registered environments)

Extra environments can be optionally added in addition to the pre-registered environments (`dev` and `prod`) with any of the following methods:

### 1. Pass a string

```js
const env = require('get-env')('test');
```

* Return `test` when the value is `TEST`.
* Otherwise, return `dev` or `prod`. (default rules apply)

### 2. Pass multiple strings as arguments or an array

```js
const env = require('get-env')('docker', 'test');
// OR
const env = require('get-env')(['docker', 'test']);
```

* Return `docker` when the value is `DOCKER`.
* Return `test` when the value is `TEST`.
* Otherwise, return `dev` or `prod`. (default rules apply)

### 3. Pass a plain object

```js
const env = require('get-env')({
  docker: 'docker',  // or 'DOCKER'
  test: ['test', 'testing'],  // or ['TEST', 'TESTING']
  prod: ['pr', 'prod', 'production']  // or ['PR', 'PROD', 'PRODUCTION']
});
```

* Return `docker` when the value is `docker`.
* Return `test` when the value is `test` or `testing`.
* Return `prod` when the value is `pr`, `prod`, or `production`. (pre-reigstered rules for `prod` are overriden)
* Otherwise, return `dev`.


## Credits

  See the [contributors](https://github.com/pilwon/node-get-env/graphs/contributors).


## License

<pre>
The MIT License (MIT)

Copyright (c) 2014-2016 Pilwon Huh

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
