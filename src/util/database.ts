import { MongoClient, Db } from 'mongodb';
import 'dotenv/config';

let _db: Db | undefined;

const mongoConnect = async (): Promise<void> => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    const client = await MongoClient.connect(process.env.MONGO_URI);
    _db = client.db();
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};

const getDb = (): Db => {
  if (_db) {
    return _db;
  }
  throw new Error('No database found!');
};

export { mongoConnect, getDb };
