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
          new Date('2019-12-24T01:40:00.000Z'),
          new Date('2019-12-25T01:40:00.000Z'),
          new Date('2019-12-26T01:40:00.000Z'),
          new Date('2019-12-27T01:40:00.000Z'),
          new Date('2019-12-28T01:40:00.000Z'),
          new Date('2019-12-29T01:40:00.000Z'),
          new Date('2019-12-29T03:35:00.000Z'),
          new Date('2019-12-30T01:40:00.000Z'),
        ],
        title: 'Black Christmas',
      },
      {
        language: 'English',
        subtitles: 'Spanish',
        times: [
          new Date('2019-12-23T17:00:00.000Z'),
          new Date('2019-12-24T17:00:00.000Z'),
          new Date('2019-12-25T17:00:00.000Z'),
          new Date('2019-12-26T17:00:00.000Z'),
          new Date('2019-12-23T19:35:00.000Z'),
          new Date('2019-12-24T19:35:00.000Z'),
          new Date('2019-12-25T19:35:00.000Z'),
          new Date('2019-12-26T19:35:00.000Z'),
          new Date('2019-12-23T22:10:00.000Z'),
          new Date('2019-12-24T22:10:00.000Z'),
          new Date('2019-12-25T22:10:00.000Z'),
          new Date('2019-12-26T22:10:00.000Z'),
          new Date('2019-12-24T00:50:00.000Z'),
          new Date('2019-12-25T00:50:00.000Z'),
          new Date('2019-12-26T00:50:00.000Z'),
          new Date('2019-12-27T00:50:00.000Z'),
          new Date('2019-12-27T17:00:00.000Z'),
          new Date('2019-12-27T19:35:00.000Z'),
          new Date('2019-12-27T22:10:00.000Z'),
          new Date('2019-12-28T00:50:00.000Z'),
          new Date('2019-12-28T17:00:00.000Z'),
          new Date('2019-12-28T19:35:00.000Z'),
          new Date('2019-12-28T22:10:00.000Z'),
          new Date('2019-12-29T00:50:00.000Z'),
          new Date('2019-12-29T03:30:00.000Z'),
          new Date('2019-12-29T17:00:00.000Z'),
          new Date('2019-12-29T19:35:00.000Z'),
          new Date('2019-12-29T22:10:00.000Z'),
          new Date('2019-12-30T00:50:00.000Z'),
        ],
        title: 'Cats',
      },
      {
        language: 'Spanish',
        subtitles: null,
        times: [new Date('2019-12-28T15:30:00.000Z')],
        title: 'Cine Para Todos - Spies in Disguise',
      },
      {
        language: 'Spanish',
        subtitles: null,
        times: [
          new Date('2019-12-23T16:00:00.000Z'),
          new Date('2019-12-24T16:00:00.000Z'),
          new Date('2019-12-25T16:00:00.000Z'),
          new Date('2019-12-26T16:00:00.000Z'),
          new Date('2019-12-23T18:25:00.000Z'),
          new Date('2019-12-24T18:25:00.000Z'),
          new Date('2019-12-25T18:25:00.000Z'),
          new Date('2019-12-26T18:25:00.000Z'),
          new Date('2019-12-23T20:50:00.000Z'),
          new Date('2019-12-24T20:50:00.000Z'),
          new Date('2019-12-25T20:50:00.000Z'),
          new Date('2019-12-26T20:50:00.000Z'),
          new Date('2019-12-23T23:15:00.000Z'),
          new Date('2019-12-24T23:15:00.000Z'),
          new Date('2019-12-25T23:15:00.000Z'),
          new Date('2019-12-26T23:15:00.000Z'),
          new Date('2019-12-27T16:00:00.000Z'),
          new Date('2019-12-27T18:25:00.000Z'),
          new Date('2019-12-27T20:50:00.000Z'),
          new Date('2019-12-27T23:15:00.000Z'),
          new Date('2019-12-28T16:00:00.000Z'),
          new Date('2019-12-28T18:25:00.000Z'),
          new Date('2019-12-28T20:50:00.000Z'),
          new Date('2019-12-28T23:15:00.000Z'),
          new Date('2019-12-29T16:00:00.000Z'),
          new Date('2019-12-29T18:25:00.000Z'),
          new Date('2019-12-29T20:50:00.000Z'),
          new Date('2019-12-29T23:15:00.000Z'),
        ],
        title: 'Frozen II',
      },
      {
        language: 'English',
        subtitles: 'Spanish',
        times: [
          new Date('2019-12-23T17:15:00.000Z'),
          new Date('2019-12-24T17:15:00.000Z'),
          new Date('2019-12-25T17:15:00.000Z'),
          new Date('2019-12-26T17:15:00.000Z'),
          new Date('2019-12-23T19:50:00.000Z'),
          new Date('2019-12-24T19:50:00.000Z'),
          new Date('2019-12-25T19:50:00.000Z'),
          new Date('2019-12-26T19:50:00.000Z'),
          new Date('2019-12-23T22:25:00.000Z'),
          new Date('2019-12-24T22:25:00.000Z'),
          new Date('2019-12-25T22:25:00.000Z'),
          new Date('2019-12-26T22:25:00.000Z'),
          new Date('2019-12-24T01:00:00.000Z'),
          new Date('2019-12-25T01:00:00.000Z'),
          new Date('2019-12-26T01:00:00.000Z'),
          new Date('2019-12-27T01:00:00.000Z'),
          new Date('2019-12-27T17:15:00.000Z'),
          new Date('2019-12-27T19:50:00.000Z'),
          new Date('2019-12-27T22:25:00.000Z'),
          new Date('2019-12-28T01:00:00.000Z'),
          new Date('2019-12-28T17:15:00.000Z'),
          new Date('2019-12-28T19:50:00.000Z'),
          new Date('2019-12-28T22:25:00.000Z'),
          new Date('2019-12-29T01:00:00.000Z'),
          new Date('2019-12-29T17:15:00.000Z'),
          new Date('2019-12-29T19:50:00.000Z'),
          new Date('2019-12-29T22:25:00.000Z'),
          new Date('2019-12-30T01:00:00.000Z'),
        ],
        title: 'Frozen II',
      },
      {
        language: 'Spanish',
        subtitles: null,
        times: [
          new Date('2019-12-23T15:50:00.000Z'),
          new Date('2019-12-24T15:50:00.000Z'),
          new Date('2019-12-25T15:50:00.000Z'),
          new Date('2019-12-26T15:50:00.000Z'),
          new Date('2019-12-23T18:45:00.000Z'),
          new Date('2019-12-24T18:45:00.000Z'),
          new Date('2019-12-25T18:45:00.000Z'),
          new Date('2019-12-26T18:45:00.000Z'),
          new Date('2019-12-23T21:40:00.000Z'),
          new Date('2019-12-24T21:40:00.000Z'),
          new Date('2019-12-25T21:40:00.000Z'),
          new Date('2019-12-26T21:40:00.000Z'),
          new Date('2019-12-24T00:35:00.000Z'),
          new Date('2019-12-25T00:35:00.000Z'),
          new Date('2019-12-26T00:35:00.000Z'),
          new Date('2019-12-27T00:35:00.000Z'),
          new Date('2019-12-27T15:50:00.000Z'),
          new Date('2019-12-27T18:45:00.000Z'),
          new Date('2019-12-27T21:40:00.000Z'),
          new Date('2019-12-28T00:35:00.000Z'),
          new Date('2019-12-28T15:50:00.000Z'),
          new Date('2019-12-28T18:45:00.000Z'),
          new Date('2019-12-28T21:40:00.000Z'),
          new Date('2019-12-29T00:35:00.000Z'),
          new Date('2019-12-29T03:30:00.000Z'),
          new Date('2019-12-29T15:50:00.000Z'),
          new Date('2019-12-29T18:45:00.000Z'),
          new Date('2019-12-29T21:40:00.000Z'),
          new Date('2019-12-30T00:35:00.000Z'),
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
          new Date('2019-12-23T15:50:00.000Z'),
          new Date('2019-12-24T15:50:00.000Z'),
          new Date('2019-12-25T15:50:00.000Z'),
          new Date('2019-12-26T15:50:00.000Z'),
          new Date('2019-12-23T18:15:00.000Z'),
          new Date('2019-12-24T18:15:00.000Z'),
          new Date('2019-12-25T18:15:00.000Z'),
          new Date('2019-12-26T18:15:00.000Z'),
          new Date('2019-12-23T20:40:00.000Z'),
          new Date('2019-12-24T20:40:00.000Z'),
          new Date('2019-12-25T20:40:00.000Z'),
          new Date('2019-12-26T20:40:00.000Z'),
          new Date('2019-12-23T23:05:00.000Z'),
          new Date('2019-12-24T23:05:00.000Z'),
          new Date('2019-12-25T23:05:00.000Z'),
          new Date('2019-12-26T23:05:00.000Z'),
          new Date('2019-12-24T01:30:00.000Z'),
          new Date('2019-12-25T01:30:00.000Z'),
          new Date('2019-12-26T01:30:00.000Z'),
          new Date('2019-12-27T01:30:00.000Z'),
          new Date('2019-12-27T15:50:00.000Z'),
          new Date('2019-12-27T18:15:00.000Z'),
          new Date('2019-12-27T20:40:00.000Z'),
          new Date('2019-12-27T23:05:00.000Z'),
          new Date('2019-12-28T01:30:00.000Z'),
          new Date('2019-12-28T15:50:00.000Z'),
          new Date('2019-12-28T18:15:00.000Z'),
          new Date('2019-12-28T20:40:00.000Z'),
          new Date('2019-12-28T23:05:00.000Z'),
          new Date('2019-12-29T01:30:00.000Z'),
          new Date('2019-12-29T15:50:00.000Z'),
          new Date('2019-12-29T18:15:00.000Z'),
          new Date('2019-12-29T20:40:00.000Z'),
          new Date('2019-12-29T23:05:00.000Z'),
          new Date('2019-12-30T01:30:00.000Z'),
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
          new Date('2019-12-23T17:45:00.000Z'),
          new Date('2019-12-24T17:45:00.000Z'),
          new Date('2019-12-25T17:45:00.000Z'),
          new Date('2019-12-26T17:45:00.000Z'),
          new Date('2019-12-23T20:15:00.000Z'),
          new Date('2019-12-24T20:15:00.000Z'),
          new Date('2019-12-25T20:15:00.000Z'),
          new Date('2019-12-26T20:15:00.000Z'),
          new Date('2019-12-23T22:45:00.000Z'),
          new Date('2019-12-24T22:45:00.000Z'),
          new Date('2019-12-25T22:45:00.000Z'),
          new Date('2019-12-26T22:45:00.000Z'),
          new Date('2019-12-24T01:15:00.000Z'),
          new Date('2019-12-25T01:15:00.000Z'),
          new Date('2019-12-26T01:15:00.000Z'),
          new Date('2019-12-27T01:15:00.000Z'),
          new Date('2019-12-27T17:45:00.000Z'),
          new Date('2019-12-27T20:15:00.000Z'),
          new Date('2019-12-27T22:45:00.000Z'),
          new Date('2019-12-28T01:15:00.000Z'),
          new Date('2019-12-28T17:45:00.000Z'),
          new Date('2019-12-28T20:15:00.000Z'),
          new Date('2019-12-28T22:45:00.000Z'),
          new Date('2019-12-29T01:15:00.000Z'),
          new Date('2019-12-29T17:45:00.000Z'),
          new Date('2019-12-29T20:15:00.000Z'),
          new Date('2019-12-29T22:45:00.000Z'),
          new Date('2019-12-30T01:15:00.000Z'),
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
          new Date('2019-12-23T15:50:00.000Z'),
          new Date('2019-12-24T15:50:00.000Z'),
          new Date('2019-12-25T15:50:00.000Z'),
          new Date('2019-12-26T15:50:00.000Z'),
          new Date('2019-12-23T19:00:00.000Z'),
          new Date('2019-12-24T19:00:00.000Z'),
          new Date('2019-12-25T19:00:00.000Z'),
          new Date('2019-12-26T19:00:00.000Z'),
          new Date('2019-12-23T22:05:00.000Z'),
          new Date('2019-12-24T22:05:00.000Z'),
          new Date('2019-12-25T22:05:00.000Z'),
          new Date('2019-12-26T22:05:00.000Z'),
          new Date('2019-12-24T01:10:00.000Z'),
          new Date('2019-12-25T01:10:00.000Z'),
          new Date('2019-12-26T01:10:00.000Z'),
          new Date('2019-12-27T01:10:00.000Z'),
          new Date('2019-12-27T15:50:00.000Z'),
          new Date('2019-12-27T19:00:00.000Z'),
          new Date('2019-12-27T22:05:00.000Z'),
          new Date('2019-12-28T01:10:00.000Z'),
          new Date('2019-12-28T15:50:00.000Z'),
          new Date('2019-12-28T19:00:00.000Z'),
          new Date('2019-12-28T22:05:00.000Z'),
          new Date('2019-12-29T01:10:00.000Z'),
          new Date('2019-12-29T15:50:00.000Z'),
          new Date('2019-12-29T19:00:00.000Z'),
          new Date('2019-12-29T22:05:00.000Z'),
          new Date('2019-12-30T01:10:00.000Z'),
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
