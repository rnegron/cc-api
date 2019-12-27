import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(__dirname, '../.env') });

import getServer from './server';
import dbConnect from './database';

process.on('uncaughtException', (err: Error) => {
  console.error(`uncaughtException ${err.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error(`unhandledRejection ${err}`);
  process.exit(1);
});

let server;

async function init() {
  try {
    await dbConnect();
    const server = await getServer();
    await server.start();
    server.log(['boot'], `Server running at: ${server.info.uri}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

init();

export default server;
