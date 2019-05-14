import logger from './logger';
import swagger from './swagger';
import rateLimiter from './rate-limiter';

export default [
  rateLimiter,
  require('@hapi/inert'),
  require('@hapi/vision'),
  swagger,
  logger,
];
