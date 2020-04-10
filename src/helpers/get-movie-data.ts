import { DateTime } from 'luxon';
import * as cheerio from 'cheerio';
import { AxiosInstance } from 'axios';

import { IMovieTaskData } from '../interfaces';
import { toBase64 } from '../helpers/image-encoding';

enum DetailPositions {
  genre = 1,
  rating = 2,
  runtime = 3,
  releaseDate = 4,
  synopsis = 8,
}

export function getTitle(movieHtml: string) {
  const $ = cheerio.load(movieHtml);

  return $('.titles').text().replace(/\\/g, '');
}

export function getGenres(movieDetails: string[]) {
  const genreString = movieDetails[DetailPositions.genre];
  if (genreString) {
    return genreString.split('/').map((genre) => genre.trim());
  }

  return [];
}

export function getRating(movieDetails: string[]) {
  const ratingString = movieDetails[DetailPositions.rating] || '';
  const rating = ratingString.split(':')[1];
  if (rating) {
    return rating.trim();
  }

  return null;
}

export function getRuntime(movieDetails: string[]) {
  const runtimeString = movieDetails[DetailPositions.runtime] || '';
  const time = runtimeString.split('TIME:')[1];

  if (time) {
    const runtime = time.trim().split(':');
    // Convert H:MM into minutes
    return Number(runtime[0]) * 60 + Number(runtime[1]);
  }

  return null;
}

export function getSynopsis(movieDetails: string[]) {
  const synopsisString = movieDetails[DetailPositions.synopsis];

  if (synopsisString && synopsisString.includes('SYNOPSIS:')) {
    return synopsisString.split('SYNOPSIS:')[1].replace(/\\/g, '').trim();
  }

  return null;
}

export function getReleaseDate(movieDetails: string[]) {
  const releaseDateString = movieDetails[DetailPositions.releaseDate] || '';
  const releaseDate = releaseDateString.split(':')[1].replace(',', '').trim();

  // Convert the release date into PR time in ISO format
  return DateTime.fromFormat(releaseDate, 'MMMM d yyyy', {
    zone: 'America/Puerto_Rico',
  })
    .toUTC()
    .toISO();
}

export async function getPoster(movieId: string, instance: AxiosInstance) {
  try {
    const response = await instance.get(`/img/posters/${movieId}.jpg`, {
      responseType: 'arraybuffer',
    });

    return toBase64(response.data, 'jpg');
  } catch (err) {
    return null;
  }
}

function getMovieDetails({
  movieHtml,
  movieDetailsArr,
}: {
  movieHtml: string;
  movieDetailsArr: string[];
}) {
  return {
    title: getTitle(movieHtml),
    genre: getGenres(movieDetailsArr),
    rating: getRating(movieDetailsArr),
    runtime: getRuntime(movieDetailsArr),
    synopsis: getSynopsis(movieDetailsArr),
    releaseDate: getReleaseDate(movieDetailsArr),
  };
}

export default async function (
  { movieId, movieHtml }: IMovieTaskData,
  instance: AxiosInstance
) {
  const $ = cheerio.load(movieHtml);

  // Create a string array of extracted data from the movie detail box
  const movieDetailsArr = $('.column .two-third > div')
    .text()
    .trim()
    .split('\n')
    .map((elem) => elem.trim())
    .filter((elem) => elem !== '');

  const movieDetails = getMovieDetails({
    movieHtml,
    movieDetailsArr,
  });

  const moviePoster = await getPoster(movieId, instance);

  const movieResults = {
    id: movieId,
    ...movieDetails,
    poster: moviePoster,
  };

  return movieResults;
}
