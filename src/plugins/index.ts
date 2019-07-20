import logger from './logger';
import swagger from './swagger';
import version from './version';
import sentry from './sentry';
import jsonApiEnforcer from './json-api-enforcer';
import rateLimiter from './rate-limiter';

let plugins = [
  require('@hapi/inert'),
  require('@hapi/vision'),
  jsonApiEnforcer,
  logger,
  version,
];

// Set up rate limiting and swagger if not testing
if (process.env.NODE_ENV !== 'test') {
  plugins = [rateLimiter, ...plugins, swagger];
}

// Set up Sentry error monitoring in production
if (process.env.NODE_ENV === 'production') {
  plugins = [
    {
      ...sentry,
      options: {
        baseUri: process.env.BASE_URI,
        client: {
          dsn: process.env.SENTRY_DSN,
          environment: process.env.SENTRY_ENV,
        },
      },
    },
    ...plugins,
  ];
}

export default plugins;
