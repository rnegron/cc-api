import logger from './logger';
import swagger from './swagger';

export default [
  require('@hapi/inert'),
  require('@hapi/vision'),
  swagger,
  logger,
];
