import Movie from '../../src/models/movie';

describe('Models: Movie', () => {
  afterEach(() => Movie.deleteMany({}));

  describe('#flagManyAsNowShowing', () => {
    it('should work as expected', async () => {
      await Movie.create({
        movieId: 'movie-a',
        nowShowing: false,
      });
      await Movie.create({
        movieId: 'movie-b',
        nowShowing: false,
      });
      await Movie.create({
        movieId: 'movie-c',
        nowShowing: false,
      });

      await Movie.flagManyAsNowShowing(['movie-a', 'movie-b']);

      const count = await Movie.count({ nowShowing: true }).exec();
      expect(count).toEqual(2);

      const moviesNowShowing = await Movie.find({ nowShowing: true })
        .lean()
        .exec();

      expect(moviesNowShowing).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ movieId: 'movie-a' }),
          expect.objectContaining({ movieId: 'movie-b' }),
        ])
      );
    });
  });

  describe('#flagManyAsComingSoon', () => {
    it('should work as expected', async () => {
      await Movie.create({
        movieId: 'movie-a',
        comingSoon: false,
      });
      await Movie.create({
        movieId: 'movie-b',
        comingSoon: false,
      });
      await Movie.create({
        movieId: 'movie-c',
        comingSoon: false,
      });

      await Movie.flagManyAsComingSoon(['movie-a', 'movie-b']);

      const count = await Movie.count({ comingSoon: true }).exec();
      expect(count).toEqual(2);

      const moviesComingSoon = await Movie.find({ comingSoon: true })
        .lean()
        .exec();

      expect(moviesComingSoon).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ movieId: 'movie-a' }),
          expect.objectContaining({ movieId: 'movie-b' }),
        ])
      );
    });
  });

  describe('#flagManyAsNotShowing', () => {
    it('should work as expected', async () => {
      await Movie.create({
        movieId: 'movie-a',
        nowShowing: true,
        comingSoon: false,
      });
      await Movie.create({
        movieId: 'movie-b',
        nowShowing: true,
        comingSoon: false,
      });
      await Movie.create({
        movieId: 'movie-c',
        nowShowing: true,
        comingSoon: false,
      });

      await Movie.flagManyAsNoLongerPlaying(['movie-a', 'movie-b']);

      const count = await Movie.count({
        nowShowing: false,
        comingSoon: false,
      }).exec();
      expect(count).toEqual(2);

      const moviesNoLongerPlaying = await Movie.find({
        nowShowing: false,
        comingSoon: false,
      })
        .lean()
        .exec();

      expect(moviesNoLongerPlaying).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ movieId: 'movie-a' }),
          expect.objectContaining({ movieId: 'movie-b' }),
        ])
      );
    });
  });
});
