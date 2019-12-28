import parseRedisUrl from '../helpers/parse-redis-url';

const rateLimitorPlugin = {
  plugin: require('hapi-rate-limitor'),
  options: {
    redis: parseRedisUrl(process.env.REDIS_URL || null),
    namespace: 'hapi-rate-limitor',
    max: 60,
    duration: 60 * 1000,
  },
};

export default rateLimitorPlugin;
