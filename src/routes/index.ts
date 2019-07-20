import comingSoonRoutes from './coming-soon';
import nowShowingRoutes from './now-showing';
import movieRunRoutes from './movie-run';
import theatreRoutes from './theatre';
import movieRoutes from './movie';

const routes = [
  ...nowShowingRoutes,
  ...theatreRoutes,
  ...comingSoonRoutes,
  ...movieRoutes,
  ...movieRunRoutes,
];

export default routes;
