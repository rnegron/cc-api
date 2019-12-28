import * as Joi from '@hapi/joi';

import movieRunController from '../controllers/movie-run';

const movieRunsDefaults = {
  method: 'GET',
  path: '/movie-runs/{movieRunId?}',
  handler: movieRunController,
  options: {
    description: 'Displays movie details.',
    notes: 'Updated every day at 1AM UTC.',
    tags: ['api', 'movie-runs', 'movies'],
    cache: {
      expiresIn: 60 * 60 * 1000, // 1 hour
      privacy: 'private',
    },
    plugins: {
      'hapi-swagger': {},
    },
    validate: {
      params: Joi.object({
        movieRunId: Joi.string()
          .max(24)
          .regex(/^[0-9a-fA-F]{24}$/)
          .optional()
          .example('54759eb3c090d83494e2d804')
          .description('The movie-run identifier. A MongoDB ObjectID.'),
      }),
    },
  },
};

export default [movieRunsDefaults];
