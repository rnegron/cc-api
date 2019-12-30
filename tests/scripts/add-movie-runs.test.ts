import { promises as fs } from 'fs';

import axios from 'axios';
import * as moxios from 'moxios';

import {
  scrapeTheatreMovieRuns,
  removeImageFromTitle,
} from '../../src/scripts/add-movie-runs';

describe('#scrapeTheatreMovieRuns', () => {
  it('should make a request and parse the result', async () => {
    const axiosInstance = axios.create({
      baseURL: 'https://example.com',
    });

    const responseText = await fs.readFile(
      `${__dirname}/../data/theatre-test.html`,
      'utf-8'
    );

    moxios.install(axiosInstance);

    moxios.stubRequest('https://example.com/theater/theatre-test', {
      status: 200,
      responseText,
    });

    const result = await scrapeTheatreMovieRuns('theatre-test', axiosInstance);

    moxios.uninstall(axiosInstance);

    expect(result).toEqual([
      {
        language: 'English',
        subtitles: 'Spanish',
        times: [
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
        ],
        title: 'Black Christmas',
      },
      {
        language: 'English',
        subtitles: 'Spanish',
        times: [
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
        ],
        title: 'Cats',
      },
      {
        language: 'Spanish',
        subtitles: null,
        times: [expect.any(Date)],
        title: 'Cine Para Todos - Spies in Disguise',
      },
      {
        language: 'Spanish',
        subtitles: null,
        times: [
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
        ],
        title: 'Frozen II',
      },
      {
        language: 'English',
        subtitles: 'Spanish',
        times: [
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
        ],
        title: 'Frozen II',
      },
      {
        language: 'Spanish',
        subtitles: null,
        times: [
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
        ],
        title: 'Jumanji: The Next Level',
      },
      {
        language: 'English',
        subtitles: 'Spanish',
        times: [],
        title: 'Jumanji: The Next Level',
      },
      {
        language: 'Spanish',
        subtitles: null,
        times: [
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
        ],
        title: 'Qué Leones',
      },
      {
        language: 'Spanish',
        subtitles: null,
        times: [],
        title: 'Spies in Disguise',
      },
      {
        language: 'English',
        subtitles: 'Spanish',
        times: [
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
        ],
        title: 'Spies in Disguise',
      },
      {
        language: 'English',
        subtitles: 'Spanish',
        times: [],
        title: 'Star Wars: The Rise of Skywalker',
      },
      {
        language: 'English',
        subtitles: 'Spanish',
        times: [
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
          expect.any(Date),
        ],
        title: 'Uncut Gems',
      },
    ]);
  });
});

describe('#parseTitle', () => {
  it('should remove <img> tags from the movie title', () => {
    const badTitle =
      '<img src="//caribbeancinemas.com/xCXC.fw.png.pagespeed.ic.nmq7Eu0Dxa.png" width="53" height="25" alt=""/>\n' +
      '                                                  \n' +
      '                                                                                           \n' +
      '                                       Ford v Ferrari';

    const fixedTitle = removeImageFromTitle(badTitle);

    expect(fixedTitle).toEqual('Ford v Ferrari');
  });

  it('should not ruin already correct movie titles', () => {
    const correctTitle = 'Ford v Ferrari';

    const updatedTitle = removeImageFromTitle(correctTitle);

    expect(updatedTitle).toEqual(correctTitle);
  });
});
