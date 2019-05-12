const swaggerPlugin = {
  plugin: require('hapi-swagger'),
  options: {
    info: {
      title: 'CC API',
      description: 'Carribean Cinemas API Documentation',
      version: '0.1',
    },
    tags: [
      {
        name: 'movies',
        description: 'API movies interface.',
      },
      {
        name: 'theatres',
        description: 'API theatres interface.',
      },
    ],
    swaggerUI: true,
    documentationPage: true,
    documentationPath: '/docs',
  },
};

export default swaggerPlugin;
