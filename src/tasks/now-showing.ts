import { AxiosPromise, AxiosInstance } from 'axios';
import * as cheerio from 'cheerio';

export default async (instance: AxiosInstance): Promise<string[]> => {
  const page = await instance.get('/now-showing/');

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
    return $('.titles').text();
  });

  return results;
};
