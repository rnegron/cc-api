import * as cheerio from 'cheerio';

import { IMovieTaskData } from '../../interfaces';

export default (movieTask: IMovieTaskData) => {
  const $ = cheerio.load(movieTask.movieHtml);
  return $('.titles > b').text();
};
