import { resolve } from 'path';
import { config } from 'dotenv';
import getServer from './server';

config({ path: resolve(__dirname, '../.env') });

process.on('uncaughtException', (err: Error) => {
  console.error(`uncaughtException ${err.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (err: any) => {
  console.error(`unhandledRejection ${err}`);
  process.exit(1);
});

async function start() {
  try {
    const server = await getServer();
    await server.start();
    console.log('Server running at:', server.info.uri);
  } catch (err) {
    console.log(err);
  }
}

start();
