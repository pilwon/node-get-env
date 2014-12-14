var assert = require('assert');

var _ = require('lodash');

var DEV_RULES = ['dev', 'development'];
var PROD_RULES = ['prod', 'production'];

function _buildExtras(args) {
  var extras = [];

  if (!args.length) {
    return extras;
  }

  // string
  if (_.isString(args[0]) && !_.isEmpty(args[0])) {
    assert(
      _.reduce(args.slice(1), function (count, env) {
        return count += (_.isString(env) && !_.isEmpty(env)) ? 0 : 1;
      }, 0) === 0,
      'When the first argument is a non-empty string, then the rest should all be non-empty strings.'
    );
    args.forEach(function (env) {
      extras.push({
        env: env,
        rules: [env.toLowerCase()]
      });
    });
    return extras;
  }

  // array
  if (_.isArray(args[0])) {
    assert(args.length === 1, 'When the first argument is an array, arguments.length should be 1.')
    assert(
      _.reduce(args[0], function (count, env) {
        return count += (_.isString(env) && !_.isEmpty(env)) ? 0 : 1;
      }, 0) === 0,
      'When the first argument is an array, all its elements should be non-empty strings.'
    );
    args[0].forEach(function (env) {
      extras.push({
        env: env,
        rules: [env.toLowerCase()]
      });
    });
    return extras;
  }

  // object
  if (_.isPlainObject(args[0])) {
    assert(args.length === 1, 'When the first argument is a plain object, arguments.length should be 1.');
    _.each(args[0], function (rules, env) {
      assert(
        (_.isString(rules) && !_.isEmpty(rules)) || (_.isArray(rules) && _.reduce(rules, function (count, rule) {
          return count += (_.isString(rule) && !_.isEmpty(rule)) ? 0 : 1;
        }, 0) === 0),
        'Rules of a plain object should be a non-empty string or an array of non-empty strings.'
      );
      if (_.isString(rules) && !_.isEmpty(rules)) {
        extras.push({
          env: env,
          rules: [rules.toLowerCase()]
        });
      } else {
        extras.push({
          env: env,
          rules: rules.map(function (rule) {
            return rule.toLowerCase()
          })
        });
      }
    });
    return extras;
  }

  throw new Error('Arguments must be non-empty string, array, or a plain object.');
}

function getEnv() {
  var args = Array.prototype.slice.call(arguments);
  var extras = _buildExtras(args);
  var nodeEnv = (process.env.NODE_ENV || '').toLowerCase();
  var extra;

  for (var i = 0; i < extras.length; ++i) {
    extra = extras[i];
    if (_.contains(extra.rules, nodeEnv)) {
      return extra.env;
    }
  }

  if (_.contains(PROD_RULES, nodeEnv)) {
    return 'prod';
  }

  if (_.contains(DEV_RULES, nodeEnv) || nodeEnv === '') {
    return 'dev';
  }

  throw new Error('Unknown environment name: NODE_ENV=' + nodeEnv);
}

module.exports = getEnv;
