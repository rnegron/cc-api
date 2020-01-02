import * as path from 'path';

import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(path.join(__dirname, '..', '.env')) });

import serverConnect from './server';
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
    const server = await serverConnect();
    await server.start();
    server.log(['boot'], `Server running at: ${server.info.uri}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

init();

// Return the server singleton
export default server;
