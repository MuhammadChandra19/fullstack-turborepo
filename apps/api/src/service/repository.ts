import { Todo } from '@/entity/todo';
import { Pagination, TodoType } from '@packages/types';

export interface TodoRepo {
  create: (todo: Todo) => Promise<void>;
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
