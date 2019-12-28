import { nowShowingController } from '../controllers/movie';

const nowShowingDefaults = {
  method: 'GET',
  path: '/now-showing',
  handler: nowShowingController,
  options: {
    description: 'Displays the movies that are featured as "now showing".',
    notes: 'Updated every day at 1AM UTC.',
    tags: ['api', 'home', 'now-showing'],
  },
};

const homePage = { ...nowShowingDefaults, path: '/' };

const nowShowingRoute = { ...nowShowingDefaults };

export default [homePage, nowShowingRoute];
