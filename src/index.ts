import * as assert from 'assert';

import { includes, isEmpty, isPlainObject, isString } from 'lodash';

const DEV_RULES = ['dev', 'development'];
const PROD_RULES = ['prod', 'production'];

function _buildExtras(args: any[] = []) {
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
    return args.map(env => {
      return {
        env,
        rules: [env.toLowerCase()]
      };
    });
  }

  // array
  if (Array.isArray(args[0])) {
    assert(args.length === 1, 'When the first argument is an array, arguments.length should be 1.')
    assert(
      args[0].reduce((count: number, env: string) => {
        return count += (isString(env) && !isEmpty(env)) ? 0 : 1;
      }, 0) === 0,
      'When the first argument is an array, all its elements should be non-empty strings.'
    );
    return args[0].map((env: string) => {
      return {
        env,
        rules: [env.toLowerCase()]
      };
    });
  }

  // object
  if (isPlainObject(args[0])) {
    assert(args.length === 1, 'When the first argument is a plain object, arguments.length should be 1.');
    const extras: any[] = [];
    for (const env of args[0]) {
      const rules: any | any[] = args[0][env];
      assert(
        (isString(rules) && !isEmpty(rules)) || (Array.isArray(rules) && rules.reduce((count, rule) => {
          return count += (isString(rule) && !isEmpty(rule)) ? 0 : 1;
        }, 0) === 0),
        'Rules of a plain object should be a non-empty string or an array of non-empty strings.'
      );
      if (isString(rules) && !isEmpty(rules)) {
        extras.push({
          env,
          rules: [(<string> rules).toLowerCase()]
        });
      } else {
        extras.push({
          env,
          rules: (<any[]> rules).map(rule => rule.toLowerCase())
        });
      }
    }
    return extras;
  }

  throw new Error('Arguments must be non-empty string, array, or a plain object.');
}

export = (...args: any[]) => {
  const extras = _buildExtras(args);
  const nodeEnv = (process.env.NODE_ENV || '').toLowerCase();

  for (let i = 0; i < extras.length; ++i) {
    const extra = extras[i];
    if (includes(extra.rules, nodeEnv)) {
      return extra.env;
    }
  }

  if (includes(PROD_RULES, nodeEnv)) {
    return 'prod';
  }

  if (includes(DEV_RULES, nodeEnv) || nodeEnv === '') {
    return 'dev';
  }

  throw new Error(`Unknown environment name: NODE_ENV=${nodeEnv}`);
};
