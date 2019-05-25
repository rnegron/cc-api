import comingSoonRoutes from './coming-soon';
import nowShowingRoutes from './now-showing';
import theatreRoutes from './theatre';
import movieRoutes from './movie';

const routes = [
  ...nowShowingRoutes,
  ...theatreRoutes,
  ...comingSoonRoutes,
  ...movieRoutes,
];

export default routes;
