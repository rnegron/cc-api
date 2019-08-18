import * as mongoose from 'mongoose';
import * as Hoek from '@hapi/hoek';
import jsonapi = require('@carsondarling/mongoose-jsonapi');

import { MovieRunsSchema } from './movie-run';

import { ITheatreDocument, ISerialize } from '../interfaces';

export interface ITheatre extends ITheatreDocument {}
export interface ITheatreModel extends mongoose.Model<ITheatre> {
  amenityMap(amenityTitle: string): string;
  serialize: ISerialize;
}

const TheatreSchema = new mongoose.Schema({
  __v: { type: Number, select: false },
  name: { type: String },
  slug: { type: String, unique: true },
  city: { type: String },
  address: { type: String },
  phone: { type: String },
  amenities: {
    cxc: { type: Boolean, default: false },
    imax: { type: Boolean, default: false },
    '3d': { type: Boolean, default: false },
    '4dx': { type: Boolean, default: false },
    atm: { type: Boolean, default: false },
    accessible: { type: Boolean, default: false },
    'party-room': { type: Boolean, default: false },
    'game-room': { type: Boolean, default: false },
    'stadium-theatre': { type: Boolean, default: false },
    'power-generator': { type: Boolean, default: false },
  },
  runs: { type: [MovieRunsSchema] },
});

TheatreSchema.statics.amenityMap = function(amenityTitle: string) {
  switch (amenityTitle) {
    case 'ATM':
      return 'atm';
    case '3D':
      return '3d';
    case 'IMAX':
      return 'imax';
    case 'Caribbean Cinemas Extreme':
      return 'cxc';
    case '4DX':
      return '4dx';
    case 'Game Room':
      return 'game-room';
    case 'Party Room':
      return 'party-room';
    case 'Sala Tipo Stadium':
      return 'stadium-theatre';
    case 'Planta Eléctrica':
      return 'power-generator';
    case '':
      return 'accessible';
    default:
      throw new Error(`Unrecognized amenity: ${Hoek.escapeHtml(amenityTitle)}`);
  }
};

TheatreSchema.plugin(jsonapi, {
  name: 'theatre',
  keyForAttributes: 'camelCase',
});

const TheatreModel: ITheatreModel = mongoose.model<ITheatre, ITheatreModel>(
  'Theatre',
  TheatreSchema
);

export { TheatreSchema };
export default TheatreModel;
