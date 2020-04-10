import axios, { AxiosInstance } from 'axios';
import * as cheerio from 'cheerio';

import { CC_URL, API_GIT_URL } from '../constants';

async function getTheatres(instance: AxiosInstance): Promise<string[]> {
  const homePage = await instance.get('/');

  const $ = cheerio.load(homePage.data);
  const theatreArr = $('.mfn-megamenu-5')
    .find('li.menu-item ')
    .nextAll()
    .map((_, elem) => {
      const menuItemLink = $(elem).find('li.menu-item a').attr('href');

      if (menuItemLink) {
        return menuItemLink.split('theater/')[1];
      } else {
        return '';
      }
    })
    .get();

  return theatreArr;
}

export async function getMovieTheatres() {
  const instance = axios.create({
    baseURL: CC_URL,
    headers: {
      'X-CC-API': API_GIT_URL,
      'User-Agent': `CC-API (${API_GIT_URL})`,
    },
  });

  const theatreSlugs = await getTheatres(instance);

  return { slugs: theatreSlugs, instance: instance };
}
