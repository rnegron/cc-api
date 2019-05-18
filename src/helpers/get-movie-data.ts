import * as cheerio from 'cheerio';
import { DateTime } from 'luxon';

import { IMovieTaskData } from '../interfaces';

enum DetailPositions {
  genre = 1,
  rating = 2,
  runtime = 3,
  releaseDate = 4,
  synopsis = 8,
}

export function getTitle(movieHtml: string) {
  const $ = cheerio.load(movieHtml);

  return $('.titles')
    .text()
    .replace(/\\/g, '');
}

export function getGenres(movieDetails: string[]) {
  const genreString = movieDetails[DetailPositions.genre];
  return genreString.split('/').map((genre) => genre.trim());
}

export function getRating(movieDetails: string[]) {
  const ratingString = movieDetails[DetailPositions.rating];
  return ratingString.split(':')[1].trim();
}

export function getRuntime(movieDetails: string[]) {
  const runtimeString = movieDetails[DetailPositions.runtime];
  const runtime = runtimeString
    .split('TIME:')[1]
    .trim()
    .split(':');

  // Convert H:MM into minutes
  return Number(runtime[0]) * 60 + Number(runtime[1]);
}

export function getReleaseDate(movieDetails: string[]) {
  const releaseDateString = movieDetails[DetailPositions.releaseDate];
  const releaseDate = releaseDateString
    .split(':')[1]
    .replace(',', '')
    .trim();
  return DateTime.fromFormat(releaseDate, 'MMMM d yyyy', {
    zone: 'America/Puerto_Rico',
  }).toISO();
}

export function getSynopsis(movieDetails: string[]) {
  const synopsisString = movieDetails[DetailPositions.synopsis];
  return synopsisString
    .split('SYNOPSIS:')[1]
    .replace(/\\/g, '')
    .trim();
}

export default async function({ movieId, movieHtml }: IMovieTaskData) {
  const $ = cheerio.load(movieHtml);

  // Create a string array of extracted data from the movie detail box
  const movieDetailsArr = $('.column .two-third > div')
    .text()
    .trim()
    .split('\n')
    .map((elem) => elem.trim())
    .filter((elem) => elem !== '');

  let title = null;
  let genre = null;
  let rating = null;
  let runtime = null;
  let synopsis = null;
  let releaseDate = null;

  try {
    title = getTitle(movieHtml);
  } catch (err) {
    console.log(`Failed to get title: ${err.message}`);
  }

  try {
    genre = getGenres(movieDetailsArr);
  } catch (err) {
    console.log(`Failed to get genre: ${err.message}`);
  }

  try {
    rating = getRating(movieDetailsArr);
  } catch (err) {
    console.log(`Failed to get rating: ${err.message}`);
  }

  try {
    runtime = getRuntime(movieDetailsArr);
  } catch (err) {
    console.log(`Failed to get runtime ${err.message}`);
  }

  try {
    synopsis = getSynopsis(movieDetailsArr);
  } catch (err) {
    console.log(`Failed to get synopsis: ${err.message}`);
  }

  try {
    releaseDate = getReleaseDate(movieDetailsArr);
  } catch (err) {
    console.log(`Failed to get release date: ${err.message}`);
  }

  const movieResults = {
    id: movieId,
    title,
    genre,
    rating,
    runtime,
    synopsis,
    releaseDate,
  };

  return movieResults;
}
