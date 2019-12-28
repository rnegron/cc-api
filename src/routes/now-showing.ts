import * as Hapi from '@hapi/hapi';

import { nowShowingController } from '../controllers/movie';

const nowShowingDefaults = {
  method: 'GET',
  path: '/now-showing',
  handler: nowShowingController,
  options: {
    description: 'Displays the movies that are featured as "now showing".',
    notes: 'Updated every day at 1AM UTC.',
    tags: ['api', 'home', 'now-showing'],
    cache: {
      expiresIn: 60 * 60 * 1000, // 1 hour
      privacy: 'private',
      statuses: [200],
    } as Hapi.RouteOptionsCache,
  },
};

const homePage = { ...nowShowingDefaults, path: '/' };

const nowShowingRoute = { ...nowShowingDefaults };

export default [homePage, nowShowingRoute];
