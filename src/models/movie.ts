import * as mongoose from 'mongoose';
import jsonapi = require('@carsondarling/mongoose-jsonapi');

import { ActorSchema } from './actor';

import { IMovieDocument, ISerialize } from '../interfaces';

export interface IMovie extends IMovieDocument {}

export interface IMovieModel extends mongoose.Model<IMovie> {
  flagManyAsNowShowing(movieIds: string[]): Promise<IMovie[]>;
  flagManyAsComingSoon(movieIds: string[]): Promise<IMovie[]>;
  flagManyAsNoLongerPlaying(movieIds: string[]): Promise<IMovie[]>;
  serialize: ISerialize;
}

export const MovieSchema = new mongoose.Schema({
  __v: { type: Number, select: false },
  movieId: { type: String, unique: true },
  title: { type: String, index: true },
  genre: { type: [String] },
  rating: { type: String },
  runtime: { type: Number },
  synopsis: { type: String },
  releaseDate: { type: Date },
  nowShowing: { type: Boolean },
  comingSoon: { type: Boolean },
  staring: { type: [ActorSchema] },
});

MovieSchema.plugin(jsonapi, {
  name: 'movie',
  serializer: { keyForAttribute: 'camelCase' },
});

MovieSchema.statics.flagManyAsNowShowing = function(movieIds: string[]) {
  return this.updateMany(
    { movieId: { $in: movieIds } },
    { nowShowing: true, comingSoon: false }
  ).exec();
};

MovieSchema.statics.flagManyAsComingSoon = function(movieIds: string[]) {
  return this.updateMany(
    { movieId: { $in: movieIds } },
    { nowShowing: false, comingSoon: true }
  ).exec();
};

MovieSchema.statics.flagManyAsNoLongerPlaying = function(movieIds: string[]) {
  return this.updateMany(
    { movieId: { $in: movieIds } },
    { nowShowing: false, comingSoon: false }
  ).exec();
};

const MovieModel: IMovieModel = mongoose.model<IMovie, IMovieModel>(
  'Movie',
  MovieSchema
);

export default MovieModel;
