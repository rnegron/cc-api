import { AxiosInstance } from 'axios';
import { Document } from 'mongoose';

export interface IMovieDocument extends Document {
  movieId: string;
  title: string;
  genre: string[];
  rating: string | null;
  runtime: number | null;
  synopsis: string | null;
  releaseDate: Date;
  nowShowing: boolean;
  comingSoon: boolean;
  poster: string | null;
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

export interface ITheatreTaskData {
  slugs: string[];
  instance: AxiosInstance;
}

// TODO: Improve this interface
export interface ISerialize {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (data: any): any;
}

export interface IMovieRunDate {
  'MON-THURS'?: string[];
  FRIDAY?: string[];
  SATURDAY?: string[];
  SUNDAY?: string[];
}

export interface ITaskFlags {
  nowShowing: boolean;
  comingSoon: boolean;
  save: boolean;
  [name: string]: unknown;
}
