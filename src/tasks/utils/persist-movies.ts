import * as signale from 'signale';

import checkIfMovieExists from './check-if-movie-exists';

import dbConnect from '../../database';
import { IMovieTaskData } from '../../interfaces';

import Movie, { IMovie } from '../../models/movie';

import getMovieData from '../../helpers/get-movie-data';

interface IQuery {
  nowShowing: boolean;
  comingSoon: boolean;
}

export default async (movies: IMovieTaskData[], query: IQuery) => {
  const dbLog = new signale.Signale({ interactive: true, scope: 'db' });

  dbLog.await('Connecting to DB...');
  await dbConnect();
  dbLog.success('DB connection successful.');

  signale.info(`Obtained ${movies.length} movies`);

  for (const movieTaskData of movies) {
    // https://github.com/klaussinani/signale/issues/44#issuecomment-499476792
    console.log();

    const movieId = movieTaskData.movieId;

    const movieLog = new signale.Signale({
      interactive: true,
      scope: `Movie ID: ${movieTaskData.movieId}`,
    });

    const movieExists = await checkIfMovieExists(movieId, movieLog);

    if (movieExists) {
      movieLog.note(`Movie already exists, updating...`);
      // Type assertion, since we checked if the movie exists already
      const movieInstance = (await Movie.findOneAndUpdate(
        { movieId },
        query
      ).exec()) as IMovie;
      movieLog.success(`Updated movie. (${movieInstance._id})`);
      continue;
    }

    let moviePayload;
    try {
      movieLog.pending(`Obtaining data for movie...`);
      const movieData = await getMovieData(movieTaskData);
      moviePayload = { movieId, ...movieData };
    } catch (err) {
      movieLog.fatal(`Could not parse movie data: ${err.message}`);
      continue;
    }

    try {
      // Create and save new movie
      const movieInstance = await Movie.create({
        ...moviePayload,
        ...query,
      });

      movieLog.success(`Saved instance (${movieInstance._id})`);
    } catch (err) {
      movieLog.fatal(`Failed to save instance (${movieTaskData.movieId})`);
      continue;
    }
  }
};
