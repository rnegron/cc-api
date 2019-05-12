import theatreController from '../controllers/theatre';

const theatreRoute = {
  method: 'GET',
  path: '/theatre/{theatreSlug?}',
  handler: theatreController,
};

export default theatreRoute;
