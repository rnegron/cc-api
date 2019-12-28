import axios, { AxiosInstance } from 'axios';
import { capitalize, chunk, first, includes, last } from 'lodash';
import * as cheerio from 'cheerio';
import * as signale from 'signale';
import * as sanitize from 'sanitize-html';

import parseDates from './utils/parse-dates';
import { CC_URL, API_GIT_URL } from '../constants';
import dbConnect from '../database';
import Theatre from '../models/theatre';
// import MovieRun from '../models/movie-run';

/**
 * Removes whitespace from the start and end of an HTML element
 * and also removes </br> tags.
 *
 * @param elem - The HTML element object to strip.
 * @returns The `elem` object trimmed and without <br> tags.
 */
function stripTags(elem: string) {
  return elem.trim().replace(/<\/?br?>/g, '');
}

export function removeImageFromTitle(movieTitle: string) {
  const clean = sanitize(movieTitle).trim();
  return clean;
}

/**
 * Obtains the subtitle language from a text which may contain it.
 *
 * @param subtitleText - The subtitle text portion obtained from parsing a movie run.
 * @returns The subtitle language (ex: Spanish | English)
 */
export function getSubtitleLanguage(subtitleText: string) {
  const subtitleLanguage = first(subtitleText.trim().split(' ')) || '';

  return capitalize(subtitleLanguage.trim());
}

function parseButtonText(buttonText: string) {
  const excludedWords = ['CXC'];
  return buttonText
    .split(' ')
    .filter((word) => !includes(excludedWords, word))
    .join(' ')
    .trim();
}

function trimFormatButtonText(buttonText: string) {
  // Remove certain words like "CXC" from the button text
  const parsedFormatButtonText = parseButtonText(buttonText);

  const trimmedText = capitalize(first(parsedFormatButtonText.split('  ')));

  const language = first(trimmedText.split(' ')) || '';
  let subtitles = null;

  const hasSubtitles = includes(trimmedText, 'subtitle');

  if (hasSubtitles) {
    const subtitleText = last(trimmedText.split('with'));

    if (subtitleText) {
      subtitles = getSubtitleLanguage(subtitleText);
    }
  }

  return { language: language.trim(), subtitles };
}

export function getMovieTimeData(movieTimeHtml: string) {
  const movieTimeData = movieTimeHtml
    .trim()
    .split('\n')
    .map((elem: string) => stripTags(elem));

  return chunk(movieTimeData, 2);
}

export async function scrapeTheatreMovieRuns(
  theatreSlug: string,
  instance: AxiosInstance
) {
  const page = await instance.get(`theater/${theatreSlug}`);
  const $ = cheerio.load(page.data);

  let results: {
    title: string;
    language: string;
    subtitles: string | null;
    times: Date[];
  }[] = [];

  // Get all movie data (title/format/times)
  const moviesData = $('.column_column .three-fourth').get();

  for (const movieData of moviesData) {
    // Get the movie title
    const movieTitle = $(movieData)
      .find('h5 > b')
      .text()
      .trim();

    const movieTitleParsed = removeImageFromTitle(movieTitle);

    const movieFormatButtonText = $(movieData)
      .find('a')
      .text()
      .trim();

    // Get the movie format (language and optional subtitles)
    const { language, subtitles } = trimFormatButtonText(movieFormatButtonText);

    // Get all the movie times
    const movieTimeHtml =
      $(movieData)
        .find('div')
        .last()
        .html() || '';

    const movieTimes = getMovieTimeData(movieTimeHtml);

    const movieTimeObj: { [date: string]: string[] } = {};

    // First element is Dates, second element is Times
    for (const movieTime of movieTimes) {
      movieTimeObj[movieTime[0]] = movieTime[1]
        .split(',')
        .map((time) => time.trim());
    }

    const parsedDates = parseDates(movieTimeObj);

    // Add title, language, subtitles and times
    results = [
      ...results,
      { title: movieTitleParsed, language, subtitles, times: parsedDates },
    ];
  }

  return results;
}

export default async function run() {
  await dbConnect();

  const instance = axios.create({
    baseURL: CC_URL,
    headers: {
      'X-CC-API': API_GIT_URL,
      'User-Agent': `CC-API (${API_GIT_URL})`,
    },
  });

  // Get all saved theatres
  const theatres = await Theatre.find({}).exec();

  // For each theatre, scrape the current movie runs
  for (const theatre of theatres) {
    // https://github.com/klaussinani/signale/issues/44#issuecomment-499476792
    console.log();

    const theatreLog = new signale.Signale({
      interactive: true,
      scope: `Theatre Slug: ${theatre.slug}`,
    });

    theatreLog.await('Scraping movie runs...');
    const movieRuns = await scrapeTheatreMovieRuns(theatre.slug, instance);
    theatreLog.success('Obtained runs:', movieRuns);
    // If the movie run does not exist, create it
    // If it exists, update it
  }
}
