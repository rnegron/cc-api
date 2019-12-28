import * as URL from 'url';
import { get } from 'lodash';

export default function parseRedisUrl(redisUrl: string | null) {
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
