import * as meow from 'meow';
import * as signale from 'signale';

import dbConnect from '../../database';
import Movie from '../../models/movie';
import getMovieData from '../../helpers/get-movie-data';
import { IMovieTaskData } from '../../interfaces';

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

    movieLog.pending(`Checking if movie exists...`);

    const existingMovie = await Movie.findOne({
      movieId: movieTaskData.movieId,
    }).exec();

    if (existingMovie) {
      movieLog.note(`Movie already exists!`);
      continue;
    }

    movieLog.pending(`Obtaining data for movie...`);
    const movieData = await getMovieData(movieTaskData);

    try {
      const movie = new Movie({
        movieId: movieTaskData.movieId,
        ...movieData,
        nowShowing: flags.nowShowing && !flags.comingSoon,
      });

      movieLog.await(`Data obtained, saving instance...`);
      const movieInstance = await movie.save();
      movieLog.success(`Saved instance (${movieInstance._id})`);
    } catch (err) {
      movieLog.fatal(`Failed to save instance (${movieTaskData.movieId})`);
      continue;
    }
  }
}

export default saveToDB;
