#!npx ts-node

import { AxiosPromise, AxiosInstance } from 'axios';
import * as cheerio from 'cheerio';

export enum Options {
  nowShowingUrl = '/now-showing/',
  comingSoonUrl = '/coming-soon/',
}

export default async (
  instance: AxiosInstance,
  choice: Options
): Promise<string[]> => {
  const page = await instance.get(choice);

  const $ = cheerio.load(page.data);
  const movieArr: string[] = $('.column_column > .one-fourth > a')
    .map((_, elem) => $(elem).attr('href'))
    .get();

  const pagePromises: AxiosPromise[] = [];

  movieArr.map((movie) => {
    pagePromises.push(instance.get(movie));
  });

  const pageResults = await Promise.all(pagePromises);

  const results = pageResults.map((page) => {
    const $ = cheerio.load(page.data);
    return $('.titles')
      .text()
      .replace(/\\/, '');
  });

  return results;
};
