var getEnv = require('../dist/');

var env;

env = getEnv();
// env = getEnv('test');
// env = getEnv('docker', 'test');
// env = getEnv('test', 'test');
// env = getEnv([]);
// env = getEnv(['test']);
// env = getEnv(['docker', 'test']);
// env = getEnv({});
// env = getEnv({
//   test: 'test'
// });
// env = getEnv({
//   test: ['test']
// });
// env = getEnv({
//   test: []
// });
// env = getEnv({
//   test: ['test', 'testing']
// });

// env = getEnv('');
// env = getEnv('test', 'test', 123);
// env = getEnv(['test', 123]);
// env = getEnv([123]);
// env = getEnv({
//   test: 123
// });
// env = getEnv({
//   test: ['test', 123]
// });
// env = getEnv({
//   test: {}
// });

console.log(env);
