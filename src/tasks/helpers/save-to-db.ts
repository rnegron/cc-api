import * as meow from 'meow';

import dbConnect from '../../database';
import Movie from '../../models/movie';
import getMovieData from '../../helpers/get-movie-data';
import { IMovieTaskData } from '../../interfaces';

export default async function(
  movies: IMovieTaskData[],
  flags: meow.Result['flags']
) {
  console.log('Connecting to DB...');
  await dbConnect();
  console.log('Connection successful.');

  console.log(`Processing ${movies.length} movies...`);
  for (let movieTaskData of movies) {
    console.log(`Obtaining data for movie with ID ${movieTaskData.movieId}...`);
    const movieData = await getMovieData(movieTaskData);

    console.log(`Data obtained, saving instance...`);
    const movie = new Movie({
      movieId: movieTaskData.movieId,
      ...movieData,
      'now-showing': flags.nowShowing && !flags.comingSoon,
    });

    try {
      const movieInstance = await movie.save();
      console.log(`Saved instance (${movieInstance._id})`);
    } catch (err) {
      console.log(`Failed to save instance (${movieTaskData.movieId})`);
      throw new Error(err.message);
    }
  }
}
