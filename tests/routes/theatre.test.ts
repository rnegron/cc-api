import { testServer } from '../setup';

describe('GET /theatres', () => {
  it('returns 200 on success', async () => {
    const res = await testServer.inject({
      method: 'GET',
      url: '/theatres',
    });
    expect(res.statusCode).toEqual(200);
  });
});
