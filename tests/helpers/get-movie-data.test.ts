import * as path from 'path';
import { promises as fs } from 'fs';

import axios from 'axios';
import * as moxios from 'moxios';

import { CC_URL } from '../../src/constants';

import getMovieData from '../../src/helpers/get-movie-data';
import { toBase64 } from '../../src/helpers/image-encoding';

describe('Get Movie Data', () => {
  it('should parse movie details from movie HTML', async () => {
    const movieHtml = await fs.readFile(
      path.join(__dirname, '..', 'data', 'movie-test.html'),
      'utf-8'
    );

    const moviePoster = await fs.readFile(
      path.join(__dirname, '..', 'data', 'frozen-2.jpg'),
      'binary'
    );

    const moviePosterBase64Encoded = toBase64(moviePoster, 'jpg');

    const axiosInstance = axios.create({
      baseURL: CC_URL,
    });

    moxios.install(axiosInstance);

    moxios.stubRequest(`${CC_URL}/img/posters/7284.jpg`, {
      status: 200,
      response: moviePoster,
    });

    const results = await getMovieData(
      { movieId: '7284', movieHtml },
      axiosInstance
    );

    moxios.uninstall(axiosInstance);

    expect(results).toEqual({
      genre: ['Animated', 'Adventure', 'Comedy'],
      id: '7284',
      poster: moviePosterBase64Encoded,
      rating: 'PG',
      releaseDate: '2019-11-21T04:00:00.000Z',
      runtime: 104,
      synopsis: null,
      title: 'Frozen II',
    });
  });
});
