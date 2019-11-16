import * as meow from 'meow';
import * as signale from 'signale';

import dbConnect from '../../database';
import Movie from '../../models/movie';
import getMovieData from '../../helpers/get-movie-data';
import { IMovieTaskData } from '../../interfaces';

async function checkIfMovieExists(movieId: string, movieLog: signale.Signale) {
  movieLog.pending(`Checking if movie exists...`);

  const existingMovie = await Movie.findOne({
    movieId: movieId,
  }).exec();

  if (existingMovie) {
    return true;
  }

  return false;
}

async function getMoviePayload(
  movieTaskData: IMovieTaskData,
  movieLog: signale.Signale
) {
  movieLog.pending(`Obtaining data for movie...`);
  const movieData = await getMovieData(movieTaskData);
  return {
    movieId: movieTaskData.movieId,
    ...movieData,
  };
}

/**
 * Saves movie task data generated in task scripts to the database.
 *
 * @param movies - Array of movie task data.
 * @param flags - Flags passed from the CLI to meow.

 */
async function saveToDB(movies: IMovieTaskData[], flags: meow.Result['flags']) {
  const dbLog = new signale.Signale({ interactive: true, scope: 'db' });

  dbLog.await('Connecting to DB...');
  await dbConnect();
  dbLog.success('DB connection successful.');

  signale.info(`Obtained ${movies.length} movies`);

  for (const movieTaskData of movies) {
    // https://github.com/klaussinani/signale/issues/44#issuecomment-499476792
    console.log();

    const movieLog = new signale.Signale({
      interactive: true,
      scope: `Movie ID: ${movieTaskData.movieId}`,
    });

    const movieExists = await checkIfMovieExists(
      movieTaskData.movieId,
      movieLog
    );

    if (movieExists) {
      movieLog.note(`Movie already exists!`);
      continue;
    }

    const moviePayload = await getMoviePayload(movieTaskData, movieLog);

    try {
      const movie = new Movie({
        ...moviePayload,
        nowShowing: flags.nowShowing && !flags.comingSoon,
      });

      const movieInstance = await movie.save();
      movieLog.success(`Saved instance (${movieInstance._id})`);
    } catch (err) {
      movieLog.fatal(`Failed to save instance (${movieTaskData.movieId})`);
      continue;
    }
  }
}

export default saveToDB;
