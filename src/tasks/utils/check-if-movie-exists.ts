import * as signale from 'signale';

import Movie from '../../models/movie';

export default async (movieId: string, movieLog: signale.Signale) => {
  movieLog.pending(`Checking if movie exists...`);

  const existingMovie = await Movie.findOne({
    movieId: movieId,
  }).exec();

  if (existingMovie) {
    return true;
  }

  return false;
};
