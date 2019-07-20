import { testServer } from '../setup';

describe('GET /movie-runs', () => {
  it('returns 200 on success', async () => {
    const res = await testServer.inject({
      method: 'GET',
      url: '/movie-runs',
    });
    expect(res.statusCode).toEqual(200);
  });
});
