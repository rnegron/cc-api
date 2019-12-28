import { get, omit } from 'lodash';

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

describe('GET /now-showing', () => {
  afterEach(() => Movie.deleteMany({}));

  it('returns 200 on success', async () => {
    const res = await testServer.inject({
      method: 'GET',
      url: '/now-showing',
    });
    expect(res.statusCode).toEqual(200);
  });

  it('returns serialized, now showing movies', async () => {
    const boilerplateMovie = {
      rating: '5',
      runtime: 120,
      synopsis: 'A test movie',
      releaseDate: new Date(),
      nowShowing: true,
      comingSoon: false,
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

    await Movie.create({
      movieId: '2314',
      title: 'Movie C',
      ...boilerplateMovie,
      nowShowing: false,
    });

    const res = await testServer.inject({
      method: 'GET',
      url: '/now-showing',
    });

    expect(get(res.result, 'data')).toHaveLength(2);

    expect(res.result).toEqual({
      data: [
        {
          type: 'movies',
          attributes: omit(movieA.toJSON(), ['_id', '__v']),
        },
        {
          type: 'movies',
          attributes: omit(movieB.toJSON(), ['_id', '__v']),
        },
      ],
    });
  });
});

describe('GET /coming-soon', () => {
  afterEach(() => Movie.deleteMany({}));

  it('returns 200 on success', async () => {
    const res = await testServer.inject({
      method: 'GET',
      url: '/coming-soon',
    });
    expect(res.statusCode).toEqual(200);
  });

  it('returns serialized, coming soon movies', async () => {
    const boilerplateMovie = {
      rating: '5',
      runtime: 120,
      synopsis: 'A test movie',
      releaseDate: new Date(),
      nowShowing: false,
      comingSoon: true,
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

    await Movie.create({
      movieId: '2314',
      title: 'Movie C',
      ...boilerplateMovie,
      comingSoon: false,
    });

    const res = await testServer.inject({
      method: 'GET',
      url: '/coming-soon',
    });

    expect(get(res.result, 'data')).toHaveLength(2);

    expect(res.result).toEqual({
      data: [
        {
          type: 'movies',
          attributes: omit(movieA.toJSON(), ['_id', '__v']),
        },
        {
          type: 'movies',
          attributes: omit(movieB.toJSON(), ['_id', '__v']),
        },
      ],
    });
  });
});
