import { Document } from 'mongoose';

export interface ITheatreDocument extends Document {
  name: string;
  slug: string;
  city: string;
  address: string;
  phone: string;
  amenities?: {
    imax?: boolean;
    '3d'?: boolean;
    '4dx'?: boolean;
    atm?: boolean;
    accessible?: boolean;
    'party-room'?: boolean;
    'game-room'?: boolean;
    'stadium-theatre'?: boolean;
    'power-generator'?: boolean;
  };
}
