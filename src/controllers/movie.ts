import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import Movie from '../models/movie';

export default async (request: Hapi.Request, _: Hapi.ResponseToolkit) => {
  const movieId = request.params.movieId;

  if (!movieId) {
    const movies = await Movie.find({}).exec();
    return Movie.serialize(movies);
  }

  const movie = await Movie.findOne({
    movieId: movieId,
  }).exec();

  if (!movie) {
    return Boom.notFound();
  }

  return Movie.serialize(movie);
};