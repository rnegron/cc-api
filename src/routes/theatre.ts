import * as Joi from '@hapi/joi';

import theatreController from '../controllers/theatre';

const theatreDefaults = {
  method: 'GET',
  path: '/theatres/{theatreSlug?}',
  handler: theatreController,
  options: {
    description: 'Get theatres',
    notes: 'Returns an array or an instance of theatre details',
    tags: ['api', 'theatre'],
    validate: {
      params: Joi.object({
        theatreSlug: Joi.string()
          .max(128)
          .regex(/[a-z]+(-[a-z])*$/)
          .optional()
          .example('san-patricio')
          .description(
            'The theatre identifier. Usually a lowercase representation of the theatre name with dashes instead of spaces.'
          ),
      }),
    },
  },
};

const theatreRoute = { ...theatreDefaults };

const alternativeTheatreRoute = {
  ...theatreDefaults,
  path: '/theaters/{theatreSlug?}',
};

export default [theatreRoute, alternativeTheatreRoute];
