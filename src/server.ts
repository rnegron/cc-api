import * as Hapi from '@hapi/hapi';
import * as CatboxRedis from '@hapi/catbox-redis';

import plugins from './plugins';
import routes from './routes';
import parseRedisUrl from './helpers/parse-redis-url';

export default async () => {
  const serverConfig: Hapi.ServerOptions = {
    port: process.env.PORT || '3000',
    host: 'localhost',
  };

  if (process.env.NODE_ENV === 'production') {
    serverConfig.host = '0.0.0.0';

    const {
      host: redisHost,
      port: redisPort,
      password: redisPassword,
    } = parseRedisUrl(process.env.REDIS_URL || null);

    serverConfig.cache = [
      {
        provider: {
          constructor: CatboxRedis,
          options: {
            partition: 'cc-api',
            host: redisHost,
            port: redisPort,
            password: redisPassword,
          },
        },
      },
    ];
  }

  const server: Hapi.Server = new Hapi.Server(serverConfig);

  await server.register(plugins);
  await server.route(routes);

  return server;
};
