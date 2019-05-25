import { testServer } from '../setup';

describe('GET /movies', () => {
  it('returns 200 on success', async () => {
    const res = await testServer.inject({
      method: 'GET',
      url: '/movies',
    });
    expect(res.statusCode).toEqual(200);
  });
});
