import * as Hapi from '@hapi/hapi';
import plugins from './plugins';
import routes from './routes';

export default async () => {
  const server: Hapi.Server = new Hapi.Server({
    host: 'localhost',
    port: 3000,
  });

  await server.register(plugins);
  await server.route(routes);

  return server;
};
