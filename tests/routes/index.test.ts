import { testServer } from '../setup';

describe('GET /', () => {
  it('returns 200 on success', async () => {
    const res = await testServer.inject({
      method: 'GET',
      url: '/',
    });
    expect(res.statusCode).toEqual(200);
  });
});
