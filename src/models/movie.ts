import * as mongoose from 'mongoose';
import jsonapi = require('@carsondarling/mongoose-jsonapi');

import { ActorSchema } from './actor';

import { IMovieDocument } from '../interfaces';

export interface IMovie extends IMovieDocument {}

export interface IMovieModel extends mongoose.Model<IMovie> {}

export const MovieSchema = new mongoose.Schema({
  __v: { type: Number, select: false },
  movieId: { type: String, unique: true },
  title: { type: String, index: true },
  genre: { type: [String] },
  rating: { type: String },
  runtime: { type: Number },
  synopsis: { type: String },
  'release-date': { type: Date },
  'now-showing': { type: Boolean },
  staring: { type: [ActorSchema] },
});

MovieSchema.plugin(jsonapi, { name: 'movie' });

const MovieModel: IMovieModel = mongoose.model<IMovie, IMovieModel>(
  'Movie',
  MovieSchema
);

export default MovieModel;
