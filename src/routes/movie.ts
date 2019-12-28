import * as Joi from '@hapi/joi';
import * as Hapi from '@hapi/hapi';

import movieController from '../controllers/movie';

const movieRoute = {
  method: 'GET',
  path: '/movies/{movieId?}',
  handler: movieController,
  options: {
    description: 'Get movies',
    notes: 'Returns an array or an instance of movie details',
    tags: ['api', 'movie'],
    cache: {
      expiresIn: 60 * 60 * 1000, // 1 hour
      privacy: 'private',
      statuses: [200],
    } as Hapi.RouteOptionsCache,
    validate: {
      params: Joi.object({
        movieId: Joi.string()
          .max(10)
          .regex(/^\d+$/)
          .optional()
          .example('6833')
          .description('The movie identifier. A numeric string.'),
      }),
    },
  },
};

export default [movieRoute];
