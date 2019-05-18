// eslint-disable-next-line
const fakeNowShowing = require('../../tests/data/now-showing.json');

const nowShowingDefaults = {
  method: 'GET',
  path: '/now-showing',
  handler: function() {
    return process.env.NODE_ENV === 'development' ? fakeNowShowing : {};
  },
  options: {
    description: 'Displays the movies that are featured as "now showing".',
    notes: 'Updated every Sunday at 5AM.',
    tags: ['api', 'home', 'now-showing'],
    plugins: {
      'hapi-swagger': {
        order: 1,
      },
    },
  },
};

const homePage = Object.assign({}, nowShowingDefaults, { path: '/' });

const nowShowingRoute = Object.assign({}, nowShowingDefaults);

export default [homePage, nowShowingRoute];
