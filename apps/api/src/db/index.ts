import { MongoClient } from 'mongodb';

const initDB = async () => {
  const uri = 'mongodb://root:root@localhost:27017'; // Match the credentials in docker-compose.yml
  const client = new MongoClient(uri);

  try {
    await client.connect();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }

  return client.db('fullstack');
};

export default initDB;
