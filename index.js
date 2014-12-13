function _env() {
  switch (process.env.NODE_ENV) {
    case 'production':
    case 'prod':
    case 'PRODUCTION':
    case 'PROD':
      return 'prod';
    default:
      return 'dev';
  }
}

module.exports = _env();
