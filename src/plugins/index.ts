import logger from './logger';
import swagger from './swagger';
import version from './version';
import rateLimiter from './rate-limiter';

export default [
  rateLimiter,
  require('@hapi/inert'),
  require('@hapi/vision'),
  swagger,
  logger,
  version,
];
