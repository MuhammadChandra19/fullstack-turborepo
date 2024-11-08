import { Todo } from '@/entity/todo';
import { Pagination, TodoType } from '@packages/types';
import { Db, ObjectId } from 'mongodb';

const todoRepository = (db: Db) => {
  const _db = db;

  const create = async (todo: Todo) => {
    try {
      const collection = _db.collection<Todo>('todo');
      todo.createdAt = new Date();
      todo.updatedAt = new Date();

      const result = await collection.insertOne(todo);
      return result.insertedId;
    } catch (e) {
      console.error('Error adding todo:', e);
      throw new Error('Failed to add todo to the database');
    }
  };

  const getByID = async (id: string): Promise<Todo | null> => {
    try {
      const collection = _db.collection<Todo>('todo');
      const todo = await collection.findOne({ _id: new ObjectId(id) });

      if (!todo) {
        console.log('Todo not found');
        return null;
      }

      return todo;
    } catch (error) {
      console.error('Error finding todo by ID:', error);
      throw new Error('Failed to retrieve todo from the database');
    }
  };

  const remove = async (id: string) => {
    try {
      const collection = _db.collection<Todo>('todo');
      const todo = await collection.deleteOne({ _id: new ObjectId(id) });

      if (todo.deletedCount === 0) {
        console.log('Todo not found');
      }
    } catch (error) {
      console.error('Error deleting todo by ID:', error);
      throw new Error('Failed to delete todo from the database');
    }
  };

  const list = async (id: string, title: string, status: TodoType | undefined, page: number, pageSize: number): Promise<{ todos: Todo[]; pagination: Pagination }> => {
    try {
      const collection = _db.collection<Todo>('todo');
      const query: Record<string, any> = {};
      if (id.length > 0) {
        query._id = id;
      }

      if (title.length > 0) {
        query.title = title;
      }
      if (status) {
        query.status = status;
      }

      const skip = (page - 1) * pageSize;

      const cursor = collection.find(query).skip(skip).limit(pageSize).toArray();
      const totalPromise = collection.countDocuments(query);

      const [todos, total] = await Promise.all([cursor, totalPromise]);

      return {
        todos,
        pagination: {
          page,
          pageSize,
          total,
        },
      };
    } catch (error) {
      console.error('Error finding todos:', error);
      throw new Error('Failed to retrieve todo list from the database');
    }
  };

  return {
    create,
    getByID,
    list,
    remove,
  };
};

export default todoRepository;
