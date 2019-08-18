import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import Movie from '../models/movie';

export default async (request: Hapi.Request) => {
  const movieId = request.params.movieId;

  if (!movieId) {
    const movies = await Movie.find({})
      .lean()
      .exec();

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
