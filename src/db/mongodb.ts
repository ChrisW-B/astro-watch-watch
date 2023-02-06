import { Db, MongoClient } from 'mongodb';

import type { Post } from '~/types/posts';

declare global {
  /* eslint-disable-next-line no-var */
  var _mongoConnection: Db | undefined;
}

const mongoCluster = import.meta.env.MONGODB_URI;
const dbName = import.meta.env.DB_NAME;
const mongoUser = import.meta.env.DB_USER;
const mongoPassword = import.meta.env.DB_PASSWORD;

if (!mongoCluster) {
  throw new Error('Invalid environment variable: "MONGODB_URI"');
}
if (!dbName) {
  throw new Error('Invalid environment variable: "DB_NAME"');
}
if (!mongoUser) {
  throw new Error('Invalid environment variable: "DB_USER"');
}
if (!mongoPassword) {
  throw new Error('Invalid environment variable: "DB_PASSWORD"');
}

let cachedMongo: Db;

const connectToDB = async (): Promise<Db> => {
  const uri = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoCluster}?retryWrites=true`;
  const mongo = await new MongoClient(uri).connect();
  return mongo.db(dbName);
};

export const getDB = async (): Promise<Db> => {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  // Text above copied from :
  // https://github.com/vercel/next.js/blob/canary/examples/with-mongodb/lib/mongodb.ts
  if (import.meta.env.NODE_ENV === 'development') {
    if (!global._mongoConnection) {
      global._mongoConnection = await connectToDB();
      cachedMongo = global._mongoConnection;
    }
    return cachedMongo;
  }
  const mongo = await connectToDB();
  return mongo;
};

export const getPostCollection = async () => {
  const db = await getDB();
  const postCollection = db.collection<Post>('posts');
  return postCollection;
};
