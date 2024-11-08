import { Context, Hono } from 'hono';
import { TodoRepo } from './repository';
import { TodoListRequest, TodoListResponse, TodoResponse } from '@packages/types';

const todoService = (repo: TodoRepo) => {
  const app = new Hono();

  app.post('/', async (c: Context) => {
    const body = await c.req.json();
    try {
      const res = await repo.create(body);
      return c.json({ insertedID: res.toHexString() }, 201);
    } catch (e) {
      c.status(500);
      return c.json({ message: e });
    }
  });

  app.get('/list', async (c: Context) => {
    const query = c.req.query();
    try {
      const { id = '', title = '', status, page = 1, pageSize = 10 } = query as unknown as TodoListRequest;
      const res = await repo.list(id, title, status, page, pageSize);
      const response: TodoResponse[] = [];
      for (let i = 0; i < res.todos.length; i++) {
        const curr = res.todos[i];
        response.push({
          id: curr._id?.toHexString()!,
          createdAt: curr.createdAt,
          status: curr.status,
          title: curr.title,
          updatedAt: curr.updatedAt,
          description: curr.description,
        });
      }
      return c.json({ todos: response, pagination: res.pagination } as TodoListResponse, 200);
    } catch (e) {
      c.status(500);
      return c.json({ message: e });
    }
  });

  app.get('/:id', async (c: Context) => {
    const id = c.req.param('id');
    try {
      const res = await repo.getByID(id);
      return c.json({ todo: res }, 200);
    } catch (e) {
      c.status(500);
      return c.json({ message: e });
    }
  });

  app.delete('/:id', async (c: Context) => {
    const id = c.req.param('id');
    try {
      await repo.remove(id);
      return c.json({ message: 'success delete' }, 200);
    } catch (e) {
      c.status(500);
      return c.json({ message: e });
    }
  });

  return app;
};

export default todoService;
