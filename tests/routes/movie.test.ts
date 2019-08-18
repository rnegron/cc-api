import { omit } from 'lodash';

import { testServer } from '../setup';

import Movie, { IMovie } from '../../src/models/movie';

describe('GET /movies', () => {
  afterEach(() => Movie.deleteMany({}));

  it('returns 200 on success', async () => {
    const res = await testServer.inject({
      method: 'GET',
      url: '/movies',
    });
    expect(res.statusCode).toEqual(200);
  });

  it('returns serialized movies', async () => {
    const boilerplateMovie = {
      rating: '5',
      runtime: 120,
      synopsis: 'A test movie',
      releaseDate: new Date(),
      nowShowing: true,
    };

    const movieA = await Movie.create({
      movieId: '1234',
      title: 'Movie A',
      ...boilerplateMovie,
    });

    const movieB = await Movie.create({
      movieId: '4321',
      title: 'Movie B',
      ...boilerplateMovie,
    });

    const res = await testServer.inject({
      method: 'GET',
      url: '/movies',
    });

    expect(res.result).toEqual({
      data: expect.arrayContaining([
        {
          type: 'movies',
          attributes: omit(movieA.toJSON(), ['_id', '__v']),
        },
        {
          type: 'movies',
          attributes: omit(movieB.toJSON(), ['_id', '__v']),
        },
      ]),
    });
  });
});

describe('GET /movies/:movieId', () => {
  let testMovie: IMovie;

  beforeEach(async () => {
    testMovie = await Movie.create({
      movieId: '1234',
      title: 'Movie A',
      rating: '5',
      runtime: 120,
      synopsis: 'A test movie',
      releaseDate: new Date(),
      nowShowing: true,
    });
  });

  afterEach(() => Movie.deleteMany({}));

  it('returns 200 on success', async () => {
    const res = await testServer.inject({
      method: 'GET',
      url: `/movies/${testMovie.movieId}`,
    });

    expect(res.statusCode).toEqual(200);
  });

  it('returns 404 on not found', async () => {
    const res = await testServer.inject({
      method: 'GET',
      url: '/movies/9876',
    });
    expect(res.statusCode).toEqual(404);
  });

  it('returns serialized movie', async () => {
    const res = await testServer.inject({
      method: 'GET',
      url: `/movies/${testMovie.movieId}`,
    });

    expect(res.result).toEqual({
      data: {
        type: 'movies',
        attributes: omit(testMovie.toJSON(), ['_id', '__v']),
      },
    });
  });
});
