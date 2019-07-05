// import * as Joi from '@hapi/joi';

import movieRunController from '../controllers/movie-run';

const movieRunsDefaults = {
  method: 'GET',
  path: '/movie-runs/{movieRunId?}',
  handler: movieRunController,
  options: {
    description: 'Displays movie details.',
    notes: 'Updated every day at 1AM UTC.',
    tags: ['api', 'movie-runs', 'movies'],
    plugins: {
      'hapi-swagger': {},
    },
  },
};

export default [movieRunsDefaults];
