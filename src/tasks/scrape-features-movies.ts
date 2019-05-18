#!npx ts-node

import { zip } from 'lodash';
import { AxiosPromise, AxiosInstance } from 'axios';
import * as cheerio from 'cheerio';

import { IMovieTaskData } from '../interfaces';

export enum Options {
  nowShowingUrl = '/now-showing/',
  comingSoonUrl = '/coming-soon/',
}

export default async (
  instance: AxiosInstance,
  choice: Options
): Promise<IMovieTaskData[]> => {
  const page = await instance.get(choice);

  const $ = cheerio.load(page.data);
  const movieArr: string[] = $('.column_column > .one-fourth > a')
    .map((_, elem) => $(elem).attr('href'))
    .get();

  const pagePromises: AxiosPromise[] = [];

  const movieIdArr: string[] = [];

  movieArr.map((movie) => {
    movieIdArr.push(movie.split('movie/')[1].replace('/', ''));
    pagePromises.push(instance.get(movie));
  });

  const pageResults = await Promise.all(pagePromises);

  const pageHtmlArr = pageResults.map((page) => {
    const $ = cheerio.load(page.data);
    return $.html();
  });

  const results: IMovieTaskData[] = zip(movieIdArr, pageHtmlArr).map((pair) => {
    return { movieId: pair[0] || '', movieHtml: pair[1] || '' };
  });

  return results;
};
