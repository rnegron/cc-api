import logger from './logger';
import swagger from './swagger';
import version from './version';
import error from './sentry';
import jsonApiEnforcer from './json-api-enforcer';
import rateLimiter from './rate-limiter';

let plugins = [
  rateLimiter,
  require('@hapi/inert'),
  require('@hapi/vision'),
  swagger,
  jsonApiEnforcer,
  logger,
  version,
];

if (process.env.NODE_ENV === 'production') {
  let sentryOptions = {
    baseUri: process.env.BASE_URI,
    client: {
      dsn: process.env.SENTRY_DSN,
      environment: process.env.SENTRY_ENV,
    },
  };

  console.log('setting sentry');
  plugins = [{ ...error, options: sentryOptions }, ...plugins];
}

export default plugins;
