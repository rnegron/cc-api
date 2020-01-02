let logLevel = 'info';

if (process.env.NODE_ENV === 'development') {
  logLevel = 'debug';
} else if (process.env.NODE_ENV === 'test') {
  logLevel = 'silent';
}

const loggerPlugin = {
  plugin: require('hapi-pino'),
  options: {
    prettyPrint: process.env.NODE_ENV !== 'production',
    redact: ['req.headers.authorization'],
    logPayload: true,
    level: logLevel,
    logEvents: ['onPostStart', 'response', 'request-error'],
  },
};

export default loggerPlugin;
