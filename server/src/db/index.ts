import * as mongo from 'mongodb';
import {
  DB_NAME,
  DB_URL,
} from '../constants';

const client = new mongo.MongoClient(DB_URL);

const indexes = {
  deductionFiles: [
    {
      keys: { s3Bucket: 1, filename: 1 },
      options: { unique: true },
    },
  ],
};

const getDb = () => client
  .db(DB_NAME);

const ensureIndexes = async () => {
  const db = getDb();

  // Ensure indexes are in place
  await Promise.all(Object.entries(indexes).map(
    ([col, colIndexes]) => colIndexes.map(
      (indexDef) => db.collection(col).createIndex(indexDef.keys, indexDef.options),
    ),
  ));
};

const connect = async () => {
  await client.connect();
  await ensureIndexes();
};

export {
  getDb,
  connect,
};
