import { Document } from 'mongoose';

export interface IMovieDocument extends Document {
  title: string;
  genre: string[];
  rating?: string;
  runtime?: number;
  synopsis?: string;
  'release-date': Date;
  'now-showing': boolean;
  staring: IActorDocument[];
}
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

export interface IActorDocument extends Document {
  name: string;
}

export interface IMovieRunDocument extends Document {
  type: string;
  language: string;
  '3d': boolean;
  'show-times'?: {
    'Mon-Thu'?: string[];
    Friday?: string[];
    Saturday?: string[];
    Sunday?: string[];
  };
}
