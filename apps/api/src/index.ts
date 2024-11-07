import { Hono } from 'hono';
import type { HelloType } from '@packages/types';
// import initDB from './db';

async function init() {
  // const mongoClient = await initDB();
  const app = new Hono();

  app.get('/', (c) => {
    return c.text('Hello Hono!');
  });

  app.get('/hello', async (c) => {
    const res: HelloType = { content: 'HELLO' };
    return c.json(res);
  });

  const server = Bun.serve({
    port: 3001,
    hostname: '0.0.0.0',
    fetch: app.fetch,
  });

  console.log('server running', server.port);
}

init().catch(console.error);
