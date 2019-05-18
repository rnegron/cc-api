const comingSoonRoute = {
  method: 'GET',
  path: '/coming-soon',
  handler: function() {
    return {};
  },
  options: {
    description: 'Displays the upcoming movies',
    notes: 'Updated every Sunday at 5AM.',
    tags: ['api', 'home', 'coming-soon'],
  },
};

export default [comingSoonRoute];
