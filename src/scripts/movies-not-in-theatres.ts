import { difference } from 'lodash';
import { getNowShowing } from './scrape-movies';

import dbConnect from '../database';

import Movie, { IMovie } from '../models/movie';

export async function getNotShowing() {
  const nowShowingMovies = await getNowShowing();

  const nowShowingMovieIds = nowShowingMovies.map((movie) => movie.movieId);

  await dbConnect();

  const storedNowShowingMovies = await Movie.find({ nowShowing: true })
    .select('movieId')
    .exec();

  const storedMoviesMovieIds = storedNowShowingMovies.map(
    (movie) => movie.movieId
  );

  const notShowingMovieIds = difference(
    storedMoviesMovieIds,
    nowShowingMovieIds
  );

  // Return a MovieTaskData interface
  return Promise.all(
    notShowingMovieIds.map(async (movieId) => {
      const { title: movieTitle } = (await Movie.findOne({
        movieId,
      }).exec()) as IMovie;

      return {
        movieId: movieId,
        movieHtml: `<div class="titles"><b>${movieTitle}</b></div>`,
      };
    })
  );
}
