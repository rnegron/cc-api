import * as meow from 'meow';
import * as signale from 'signale';

import dbConnect from '../../database';
import Movie from '../../models/movie';
import getMovieData from '../../helpers/get-movie-data';
import { IMovieTaskData } from '../../interfaces';

export default async function(
  movies: IMovieTaskData[],
  flags: meow.Result['flags']
) {
  let dbLog = new signale.Signale({ interactive: true, scope: 'db' });

  dbLog.await('Connecting to DB...');
  await dbConnect();
  dbLog.success('DB connection successful.');

  signale.info(`Obtained ${movies.length} movies`);

  for (let movieTaskData of movies) {
    // https://github.com/klaussinani/signale/issues/44#issuecomment-499476792
    console.log();

    let movieLog = new signale.Signale({
      interactive: true,
      scope: `Movie ID: ${movieTaskData.movieId}`,
    });

    movieLog.pending(`Checking if movie exists...`);

    let existingMovie = await Movie.findOne({
      movieId: movieTaskData.movieId,
    }).exec();

    if (existingMovie) {
      movieLog.note(`Movie already exists!`);
      continue;
    }

    let movieData;
    try {
      movieLog.pending(`Obtaining data for movie...`);
      movieData = await getMovieData(movieTaskData);
    } catch (err) {
      movieLog.fatal(`Failed to obtain movie data, error: ${err.message}`);
      continue;
    }

    movieLog.await(`Data obtained, saving instance...`);
    const movie = new Movie({
      movieId: movieTaskData.movieId,
      ...movieData,
      'now-showing': flags.nowShowing && !flags.comingSoon,
    });

    try {
      const movieInstance = await movie.save();
      movieLog.success(`Saved instance (${movieInstance._id})`);
    } catch (err) {
      movieLog.fatal(`Failed to save instance (${movieTaskData.movieId})`);
      throw new Error(err.message);
    }
  }
}
