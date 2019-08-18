import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import MovieRun from '../models/movie-run';

export default async (request: Hapi.Request) => {
  const movieRunId = request.params.movieRunId;

  if (!movieRunId) {
    const movieRuns = await MovieRun.find({})
      .lean()
      .exec();

    return MovieRun.serialize(movieRuns);
  }

  const movieRun = await MovieRun.findOne({
    movieId: movieRunId,
  })
    .lean()
    .exec();

  if (!movieRun) {
    return Boom.notFound();
  }

  return MovieRun.serialize(movieRun);
};
