import * as mongoose from 'mongoose';
import { ActorSchema } from './actor';

export const MovieSchema = new mongoose.Schema({
  __v: { type: Number, select: false },
  title: { type: String, index: true },
  genre: { type: [String] },
  rating: { type: String },
  runtime: { type: Number },
  synopsis: { type: String },
  'release-date': { type: Date },
  'now-showing': { type: Boolean },
  staring: { type: [ActorSchema] },
});

const MovieModel = mongoose.model('Movie', MovieSchema);
export default MovieModel;
