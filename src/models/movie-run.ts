import * as mongoose from 'mongoose';
import jsonapi = require('@carsondarling/mongoose-jsonapi');

import { IMovieRunDocument } from '../interfaces';

export interface IMovieRun extends IMovieRunDocument {}
export interface IMovieRunModel extends mongoose.Model<IMovieRun> {}

export const MovieRunsSchema = new mongoose.Schema({
  __v: { type: Number, select: false },
  type: { type: String, default: 'Normal' },
  language: { type: String, default: 'Spanish' },
  subtitles: { type: String, default: null },
  '3d': { type: Boolean, default: false },
  'show-times': {
    'Mon-Thu': [String],
    Friday: [String],
    Saturday: [String],
    Sunday: [String],
  },
});

MovieRunsSchema.plugin(jsonapi, { name: 'movie-runs' });

const MovieRunsModel = mongoose.model<IMovieRun, IMovieRunModel>(
  'movierun',
  MovieRunsSchema
);

export default MovieRunsModel;
