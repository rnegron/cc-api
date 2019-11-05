import * as mongoose from 'mongoose';

const host = process.env.DATABASE_HOST || 'localhost';
const port = process.env.DATABASE_PORT || '27017';
const database = process.env.DATABASE_NAME || 'cc-api';
const dbUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_DB_URI
    : `mongodb://${host}:${port}/${database}`;

export default () => {
  return mongoose.connect(dbUrl || `mongodb://${host}:${port}/${database}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};
