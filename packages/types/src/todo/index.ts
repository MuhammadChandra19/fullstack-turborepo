import { Pagination, TodoType } from '../common';

export interface CreateTodoRequest {
  title: string;
  status: TodoType;
  description?: string;
}

export interface TodoResponse {
  id: string;
  title: string;
  status: TodoType;
  description?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface TodoListRequest {
  id?: string;
  title?: string;
  status?: TodoType;
  page: number;
  pageSize: number;
}

export interface TodoListResponse {
  todos: TodoResponse[];
  pagination: Pagination;
}
