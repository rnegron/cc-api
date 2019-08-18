import { Document } from 'mongoose';

export interface IMovieDocument extends Document {
  movieId: string;
  title: string;
  genre: string[];
  rating: string;
  runtime: number;
  synopsis: string;
  releaseDate: Date;
  nowShowing: boolean;
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
    partyRoom?: boolean;
    gameRoom?: boolean;
    stadiumTheatre?: boolean;
    powerGenerator?: boolean;
  };
}

export interface IActorDocument extends Document {
  name: string;
}

export interface IMovieRunDocument extends Document {
  type: string;
  language: string;
  '3d': boolean;
  showTimes?: {
    'Mon-Thu'?: string[];
    Friday?: string[];
    Saturday?: string[];
    Sunday?: string[];
  };
}

export interface IMovieTaskData {
  movieId: string;
  movieHtml: string;
}

export interface ISerialize {
  (data: Document | Document[]): any;
}

export interface IMovieRunDate {
  'MON-THURS'?: string[];
  FRIDAY?: string[];
  SATURDAY?: string[];
  SUNDAY?: string[];
}
