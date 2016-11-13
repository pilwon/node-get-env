const getEnv = require('../dist/');

const TEST_CASES = [
  {
    title: 'No argument',
    functions: [
      () => getEnv(),
      () => getEnv([]),
      () => getEnv({}),
      () => getEnv({
        test: [],
      }),
    ],
    tests: [
      ['', 'dev'],
      ['dev', 'dev'],
      ['development', 'dev'],
      ['prod', 'prod'],
      ['production', 'prod'],
    ],
  },
  {
    title: '1 extra env (test: "test")',
    functions: [
      () => getEnv('test'),
      () => getEnv(['test']),
      () => getEnv({
        test: 'test',
      }),
      () => getEnv({
        test: ['test'],
      }),
    ],
    tests: [
      ['', 'dev'],
      ['dev', 'dev'],
      ['development', 'dev'],
      ['prod', 'prod'],
      ['production', 'prod'],
      ['test', 'test'],
    ],
  },
  {
    title: '1 extra env (test: "test|testing")',
    functions: [
      () => getEnv({
        test: ['test', 'testing'],
      }),
    ],
    tests: [
      ['', 'dev'],
      ['dev', 'dev'],
      ['development', 'dev'],
      ['prod', 'prod'],
      ['production', 'prod'],
      ['test', 'test'],
      ['testing', 'test'],
    ],
  },
  {
    title: '2 extra env (docker, test)',
    functions: [
      () => getEnv('docker', 'test'),
      () => getEnv(['docker', 'test']),
      () => getEnv({
        docker: 'docker',
        test: 'test',
      }),
    ],
    tests: [
      ['', 'dev'],
      ['dev', 'dev'],
      ['development', 'dev'],
      ['prod', 'prod'],
      ['production', 'prod'],
      ['docker', 'docker'],
      ['test', 'test'],
    ],
  },
  {
    title: 'Intentional error',
    functions: [
      () => getEnv(''),
      () => getEnv('test', 'test', 123),
      () => getEnv(['test', 123]),
      () => getEnv([123]),
      () => getEnv({
        test: 123,
      }),
      () => getEnv({
        test: ['test', 123],
      }),
      () => getEnv({
        test: {},
      }),
    ],
    error: true,
  },
];

try {
  TEST_CASES.forEach(({title, functions, tests, error}, idx) => {
    process.stdout.write(`[${idx + 1}] ${title}: `);
    if (!functions.length) {
      return console.log('<empty>');
    }
    functions.forEach((fn, i) => {
      if (error) {
        let fail = false;
        try {
          delete process.env.NODE_ENV;
          fn();
          fail = true;
        } catch (err) {}
        if (fail) {
          process.stdout.write('x\n');
          throw new Error('Function expected to fail but it did not');
        }
        process.stdout.write('✓');
      } else if (tests) {
        for (const [env, ans] of tests) {
          try {
            process.env.NODE_ENV = env;
            const res = fn();
            const pass = res === ans;
            process.stdout.write(pass ? '✓' : 'x');
            if (!pass) {
              throw new Error(`env=${env}, res=${res}, ans=${ans}, fn=${fn.toString()}`);
            }
          } catch (err) {
            process.stdout.write('x\n');
            throw err;
          }
        }
      } else {
        process.stdout.write('<invalid>\n');
        throw new Error('Missing "tests" key');
      }
      if (i < functions.length - 1) {
        process.stdout.write(', ');
      }
    });
    console.log();
  });
  console.log('SUCCESS!');
} catch (err) {
  console.error(`Error: ${err.message}`);
}
