import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import Movie from '../models/movie';

export async function comingSoonController(request: Hapi.Request) {
  const movies = await Movie.find({ comingSoon: true }).lean().exec();

  request.log(['debug', 'coming-soon'], `Returning ${movies.length} movies`);

  return Movie.serialize(movies);
}

export async function nowShowingController(request: Hapi.Request) {
  const movies = await Movie.find({ nowShowing: true }).lean().exec();

  request.log(['debug', 'now-showing'], `Returning ${movies.length} movies`);

  return Movie.serialize(movies);
}

export default async (request: Hapi.Request) => {
  const movieId = request.params.movieId;

  if (!movieId) {
    const movies = await Movie.find({}).lean().exec();

    return Movie.serialize(movies);
  }

  const movie = await Movie.findOne({
    movieId: movieId,
  })
    .lean()
    .exec();

  if (!movie) {
    return Boom.notFound();
  }

  return Movie.serialize(movie);
};
