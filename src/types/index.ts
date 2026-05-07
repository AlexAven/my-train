import { InferSchemaType, Types } from 'mongoose';

import { userSchema } from '@/models/user';
import { todoSchema } from '@/models/todo';

type InferredUser = InferSchemaType<typeof userSchema>;

type InferredTodo = InferSchemaType<typeof todoSchema>;

export type UserType = InferredUser & {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type UserClient = {
  _id: string;
  name: string;
  email: string;
  phone: number;
  createdAt: string;
  updatedAt: string;
};

export type TodoType = InferredTodo & {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type TodoClient = {
  _id: string;
  title: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
};
