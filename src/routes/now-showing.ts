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
    notes: 'Updated every day at 1AM UTC.',
    tags: ['api', 'home', 'now-showing'],
  },
};

const homePage = { ...nowShowingDefaults, path: '/' };

const nowShowingRoute = { ...nowShowingDefaults };

export default [homePage, nowShowingRoute];
