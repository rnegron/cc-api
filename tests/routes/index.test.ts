import * as Hapi from '@hapi/hapi';

import getServer from '../../src/server';

describe('GET /', () => {
  let testServer: Hapi.Server;

  beforeAll(async () => {
    testServer = await getServer();
  });

  beforeEach(async () => {
    testServer.initialize();
  });

  afterEach(async () => {
    await testServer.stop();
  });

  it('returns 200 on success', async () => {
    const res = await testServer.inject({
      method: 'GET',
      url: '/',
    });
    expect(res.statusCode).toEqual(200);
  });
});
