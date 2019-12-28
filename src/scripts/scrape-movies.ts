import { zip } from 'lodash';
import axios from 'axios';
import * as cheerio from 'cheerio';

import { IMovieTaskData } from '../interfaces';

import { CC_URL, API_GIT_URL } from '../constants';

export enum urlOptions {
  nowShowingUrl = '/now-showing/',
  comingSoonUrl = '/coming-soon/',
}

async function scrapeMovies(url: urlOptions): Promise<IMovieTaskData[]> {
  const instance = axios.create({
    baseURL: CC_URL,
    headers: { 'X-CC-API': API_GIT_URL },
  });

  const page = await instance.get(url);

  const $ = cheerio.load(page.data);
  const movieArr: string[] = $('.column_column > .one-fourth > a')
    .map((_, elem) => $(elem).attr('href'))
    .get();

  const movieIdArr: string[] = [];

  const pageResults = [];

  for (const moviePath of movieArr) {
    try {
      const result = await instance.get(moviePath);
      pageResults.push(result);
      movieIdArr.push(moviePath.split('movie/')[1].replace('/', ''));
    } catch (err) {
      console.error(`Could not get ${moviePath}: ${err.message}`);
    }
  }

  const pageHtmlArr = pageResults.map((page) => {
    const $ = cheerio.load(page.data);
    return $.html();
  });

  const results: IMovieTaskData[] = zip(movieIdArr, pageHtmlArr).map((pair) => {
    return { movieId: pair[0] || '', movieHtml: pair[1] || '' };
  });

  return results;
}

export function getNowShowing(): Promise<IMovieTaskData[]> {
  return scrapeMovies(urlOptions.nowShowingUrl);
}

export function getComingSoon(): Promise<IMovieTaskData[]> {
  return scrapeMovies(urlOptions.comingSoonUrl);
}
