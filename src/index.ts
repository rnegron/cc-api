import { resolve } from 'path';
import { config } from 'dotenv';
import getServer from './server';
import dbConnect from './database';

config({ path: resolve(__dirname, '../.env') });

process.on('uncaughtException', (err: Error) => {
  console.error(`uncaughtException ${err.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (err: any) => {
  console.error(`unhandledRejection ${err}`);
  process.exit(1);
});

let server;

(async () => {
  try {
    await dbConnect();
    const server = await getServer();
    await server.start();
    server.log(['boot'], `Server running at: ${server.info.uri}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();

export default server;
