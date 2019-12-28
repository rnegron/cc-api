import { comingSoonController } from '../controllers/movie';

const comingSoonRoute = {
  method: 'GET',
  path: '/coming-soon',
  handler: comingSoonController,
  options: {
    description: 'Displays the upcoming movies',
    notes: 'Updated every day at 1AM UTC.',
    tags: ['api', 'home', 'coming-soon'],
    cache: {
      expiresIn: 60 * 60 * 1000, // 1 hour
      privacy: 'private',
    },
  },
};

export default [comingSoonRoute];
