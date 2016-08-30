const assert = require('assert');

const isEmpty = require('lodash.isempty');
const isPlainObject = require('lodash.isplainobject');
const isString = require('lodash.isstring');

const DEV_RULES = ['dev', 'development'];
const PROD_RULES = ['prod', 'production'];

function _buildExtras(args = []) {
  if (!args.length) {
    return [];
  }

  // string
  if (isString(args[0]) && !isEmpty(args[0])) {
    assert(
      args.slice(1).reduce((count, env) => {
        return count += (isString(env) && !isEmpty(env)) ? 0 : 1;
      }, 0) === 0,
      'When the first argument is a non-empty string, then the rest should all be non-empty strings.'
    );
    return args.map((env) => {
      return {
        env: env,
        rules: [env.toLowerCase()]
      };
    });
  }

  // array
  if (Array.isArray(args[0])) {
    assert(args.length === 1, 'When the first argument is an array, arguments.length should be 1.')
    assert(
      args[0].reduce((count, env) => {
        return count += (isString(env) && !isEmpty(env)) ? 0 : 1;
      }, 0) === 0,
      'When the first argument is an array, all its elements should be non-empty strings.'
    );
    return args[0].map((env) => {
      return {
        env: env,
        rules: [env.toLowerCase()]
      };
    });
  }

  // object
  if (isPlainObject(args[0])) {
    assert(args.length === 1, 'When the first argument is a plain object, arguments.length should be 1.');
    const extras = [];
    for (const env in args[0]) {
      const rules = args[0][env];
      assert(
        (isString(rules) && !isEmpty(rules)) || (Array.isArray(rules) && rules.reduce((count, rule) => {
          return count += (isString(rule) && !isEmpty(rule)) ? 0 : 1;
        }, 0) === 0),
        'Rules of a plain object should be a non-empty string or an array of non-empty strings.'
      );
      if (isString(rules) && !isEmpty(rules)) {
        extras.push({
          env: env,
          rules: [rules.toLowerCase()]
        });
      } else {
        extras.push({
          env: env,
          rules: rules.map(rule => rule.toLowerCase())
        });
      }
    }
    return extras;
  }

  throw new Error('Arguments must be non-empty string, array, or a plain object.');
}

module.exports = (...args) => {
  const extras = _buildExtras(args);
  const nodeEnv = (process.env.NODE_ENV || '').toLowerCase();

  for (let i = 0; i < extras.length; ++i) {
    const extra = extras[i];
    if (extra.rules.includes(nodeEnv)) {
      return extra.env;
    }
  }

  if (PROD_RULES.includes(nodeEnv)) {
    return 'prod';
  }

  if (DEV_RULES.includes(nodeEnv) || nodeEnv === '') {
    return 'dev';
  }

  throw new Error(`Unknown environment name: NODE_ENV=${nodeEnv}`);
}
