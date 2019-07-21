import * as mongoose from 'mongoose';
import jsonapi = require('@carsondarling/mongoose-jsonapi');

import { IMovieRunDocument, ISerialize } from '../interfaces';

export interface IMovieRun extends IMovieRunDocument {}
export interface IMovieRunModel extends mongoose.Model<IMovieRun> {
  serialize: ISerialize;
}

export const MovieRunsSchema = new mongoose.Schema({
  __v: { type: Number, select: false },
  type: { type: String, default: 'Normal' },
  language: { type: String, default: 'Spanish' },
  subtitles: { type: String, default: null },
  '3d': { type: Boolean, default: false },
  'show-times': {
    'Mon-Thu': [Date],
    'Mon-Fri': [Date],
    Friday: [Date],
    Saturday: [Date],
    Sunday: [Date],
  },
});

MovieRunsSchema.plugin(jsonapi, { name: 'movie-runs' });

const MovieRunsModel = mongoose.model<IMovieRun, IMovieRunModel>(
  'movierun',
  MovieRunsSchema
);

export default MovieRunsModel;
