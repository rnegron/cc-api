import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import Theatre from '../models/theatre';

export default async (request: Hapi.Request, _: Hapi.ResponseToolkit) => {
  const theatreSlug = encodeURIComponent(request.params.theatreSlug);
  if (theatreSlug) {
    const theatre = await Theatre.find({ slug: theatreSlug }).exec();
    if (theatre.length === 0) {
      return Boom.notFound();
    }
    return theatre;
  } else {
    const theatres = await Theatre.find({}).exec();
    return theatres;
  }
};
