import * as mongoose from 'mongoose';
import * as Hapi from '@hapi/hapi';
import { MongoMemoryServer } from 'mongodb-memory-server';

import getServer from '../src/server';

jest.setTimeout(600000);

let mongoServer: MongoMemoryServer;
export let testServer: Hapi.Server;

beforeAll(async () => {
  testServer = await getServer();

  mongoServer = new MongoMemoryServer();

  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
});

beforeEach(async () => {
  await testServer.initialize();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await testServer.stop();
});
