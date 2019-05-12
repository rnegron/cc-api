import * as Joi from '@hapi/joi';

import theatreController from '../controllers/theatre';

const theatreDefaults = {
  method: 'GET',
  path: '/theatres/{theatreSlug?}',
  handler: theatreController,
  options: {
    description: 'Get theatre list',
    notes: 'Returns an array of theatres',
    tags: ['api', 'theatre'],
    validate: {
      params: {
        theatreSlug: Joi.string()
          .max(128)
          .regex(/[a-z]+(-[a-z])*$/)
          .optional()
          .example('san-patricio')
          .description(
            'The theatre identifier. Usually a lowercase representation of the theatre name with dashes instead of spaces.'
          ),
      },
    },
  },
};

const theatreRoute = Object.assign({}, theatreDefaults);

const alternativeTheatreRoute = Object.assign({}, theatreDefaults, {
  path: '/theaters/{theatreSlug?}',
});

export default [theatreRoute, alternativeTheatreRoute];
