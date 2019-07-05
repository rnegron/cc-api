import * as Hapi from '@hapi/hapi';
import plugins from './plugins';
import routes from './routes';

export default async () => {
  const serverConfig: { port: string; host?: string } = {
    port: process.env.PORT || '3000',
    host: '0.0.0.0',
  };

  if (process.env.NODE_ENV !== 'production') {
    serverConfig.host = 'localhost';
  }

  const server: Hapi.Server = new Hapi.Server(serverConfig);

  await server.register(plugins);
  await server.route(routes);

  return server;
};
