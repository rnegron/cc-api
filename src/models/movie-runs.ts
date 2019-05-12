import * as mongoose from 'mongoose';

export const MovieRunsSchema = new mongoose.Schema({
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

const MovieRunsModel = mongoose.model('movierun', MovieRunsSchema);

export default MovieRunsModel;
