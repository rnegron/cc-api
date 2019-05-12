import * as mongoose from 'mongoose';
import { MovieRunsSchema } from './movie-runs';

export const TheatreSchema = new mongoose.Schema({
  name: { type: String },
  city: { type: String },
  slug: { type: String, index: true },
  runs: { type: [MovieRunsSchema] },
});

const TheatreModel = mongoose.model('Theatre', TheatreSchema);
export default TheatreModel;
