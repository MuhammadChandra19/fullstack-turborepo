import initDB from '@/db';
import { HelloType } from '@packages/types';
import { prettyJSON } from 'hono/pretty-json';
import { Hono } from 'hono';
import todoService from '@/service/todo';
import todoRepository from '@/repository/todo';

const startServer = async () => {
  const mongoClient = await initDB();
  const todoRepo = todoRepository(mongoClient);

  const app = new Hono().basePath('/api');
  app.use(prettyJSON());
  app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404));

  app.get('/', (c) => {
    return c.text('Hello Hono!');
  });

  app.get('/hello', async (c) => {
    const res: HelloType = { content: 'HELLO' };
    return c.json(res);
  });

  app.route('/todo', todoService(todoRepo));

  return app;
};

export default startServer;
