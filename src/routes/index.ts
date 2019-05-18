import comingSoonRoutes from './coming-soon';
import nowShowingRoutes from './now-showing';
import theatreRoutes from './theatre';

const routes = [...nowShowingRoutes, ...theatreRoutes, ...comingSoonRoutes];

export default routes;
