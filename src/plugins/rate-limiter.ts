const rateLimitorPlugin = {
  plugin: require('hapi-rate-limitor'),
  options: {
    redis: {
      host: process.env.REDIS_URL,
    },
    namespace: 'hapi-rate-limitor',
    max: 60,
    duration: 60 * 1000,
  },
};

export default rateLimitorPlugin;
