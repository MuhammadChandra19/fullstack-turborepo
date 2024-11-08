import { Todo } from '@/entity/todo';
import { Pagination, TodoType } from '@packages/types';
import { ObjectId } from 'mongodb';

export interface TodoRepo {
  create: (todo: Todo) => Promise<ObjectId>;
  getByID: (id: string) => Promise<Todo | null>;
  list: (
    id: string,
    title: string,
    status: TodoType | undefined,
    page: number,
    pageSize: number
  ) => Promise<{
    todos: Todo[];
    pagination: Pagination;
  }>;
  remove: (id: string) => Promise<void>;
}
