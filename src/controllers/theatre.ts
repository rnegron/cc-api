import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import Theatre from '../models/theatre';

export default async (request: Hapi.Request) => {
  const theatreSlug = request.params.theatreSlug;

  if (!theatreSlug) {
    const theatres = await Theatre.find({}).exec();
    return Theatre.serialize(theatres);
  }

  const theatre = await Theatre.findOne({
    slug: theatreSlug,
  }).exec();

  if (!theatre) {
    return Boom.notFound();
  }

  return Theatre.serialize(theatre);
};
