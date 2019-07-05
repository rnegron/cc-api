const comingSoonRoute = {
  method: 'GET',
  path: '/coming-soon',
  handler: function() {
    return {};
  },
  options: {
    description: 'Displays the upcoming movies',
    notes: 'Updated every day at 1AM UTC.',
    tags: ['api', 'home', 'coming-soon'],
  },
};

export default [comingSoonRoute];
