import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import Theatre from '../models/theatre';

export default async (request: Hapi.Request, _: Hapi.ResponseToolkit) => {
  const theatreSlug = request.params.theatreSlug;
  if (theatreSlug) {
    const theatre = await Theatre.findOne({ slug: theatreSlug }).exec();
    if (!theatre) {
      return Boom.notFound();
    }
    return theatre;
  } else {
    const theatres = await Theatre.find({}).exec();
    return theatres;
  }
};
