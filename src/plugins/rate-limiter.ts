import * as URL from 'url';
import { get } from 'lodash';

function parseRedisUrl(redisUrl: string | null) {
  if (!redisUrl) {
    return {};
  }

  const parsedData = URL.parse(redisUrl);

  return {
    host: parsedData.hostname,
    port: parsedData.port,
    password: (get(parsedData, 'auth') || ':').split(':')[1],
  };
}

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
