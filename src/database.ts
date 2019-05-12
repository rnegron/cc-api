import * as mongoose from 'mongoose';

const host = process.env.DATABASE_HOST || 'localhost';
const port = process.env.DATABASE_PORT || '27017';
const database = process.env.DATABASE_NAME || 'cc-api';
const dbUrl = `mongodb://${host}:${port}/${database}`;

export default () => {
  return mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};
