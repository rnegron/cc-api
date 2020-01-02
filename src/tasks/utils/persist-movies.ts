import axios from 'axios';
import * as signale from 'signale';

import checkIfMovieExists from './check-if-movie-exists';

import { CC_URL } from '../../constants';
import dbConnect from '../../database';
import { IMovieTaskData } from '../../interfaces';

import Movie, { IMovie } from '../../models/movie';

import getMovieData from '../../helpers/get-movie-data';

interface IStatusQuery {
  nowShowing: boolean;
  comingSoon: boolean;
}

export default async (movies: IMovieTaskData[], statusQuery: IStatusQuery) => {
  const dbLog = new signale.Signale({ interactive: true, scope: 'db' });

  dbLog.await('Connecting to DB...');
  await dbConnect();
  dbLog.success('DB connection successful.');

  signale.info(`Obtained ${movies.length} movies`);

  const axiosInstance = axios.create({
    baseURL: CC_URL,
  });

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
      movieLog.note(`Movie already exists, updating status...`);
      // Type assertion, since we checked if the movie exists already
      const movieInstance = (await Movie.findOneAndUpdate(
        { movieId },
        statusQuery
      ).exec()) as IMovie;
      movieLog.success(`Updated movie status (${movieInstance._id})`);
      continue;
    }

    let moviePayload;
    try {
      movieLog.pending(`Obtaining data for movie...`);
      const movieData = await getMovieData(movieTaskData, axiosInstance);
      moviePayload = { movieId, ...movieData };
    } catch (err) {
      movieLog.fatal(`Could not parse movie data: ${err.message}`);
      continue;
    }

    try {
      // Create and save new movie
      const movieInstance = await Movie.create({
        ...moviePayload,
        ...statusQuery,
      });

      movieLog.success(`Saved instance (${movieInstance._id})`);
    } catch (err) {
      movieLog.fatal(`Failed to save instance (${movieTaskData.movieId})`);
      continue;
    }
  }
};
