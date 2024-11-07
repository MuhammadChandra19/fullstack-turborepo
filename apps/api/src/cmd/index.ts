// import initDB from '@/db';
import { HelloType } from '@packages/types';
import { Hono } from 'hono';

const startServer = async () => {
  // const mongoClient = await initDB();
  const app = new Hono();

  app.get('/', (c) => {
    return c.text('Hello Hono!');
  });

  app.get('/hello', async (c) => {
    const res: HelloType = { content: 'HELLO' };
    return c.json(res);
  });

  return app;
};

export default startServer;
