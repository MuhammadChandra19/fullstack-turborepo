import { TodoType } from '@packages/types';
import { ObjectId } from 'mongodb';

export interface Todo {
  _id?: ObjectId; // MongoDB ID field
  title: string;
  status: TodoType;
  description?: string;

  createdAt: Date;
  updatedAt: Date;
}
