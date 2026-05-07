import { Types } from 'mongoose';

import connectToDatabase from '@/lib/db/mongodb';
import getRedisClient from '@/lib/db/redis';
import Todo from '@/models/todo';
import normalizeTodo from '../utils/normalize-todo';

import { TodoClient, TodoType } from '@/types';

const CACHE_TODOS_ALL = 'cache:todos:all';
const CACHE_TTL_TODOS_SECONDS = 60;

const getAllTodos = async () => {
  const redis = await getRedisClient();
  const cached = await redis.get(CACHE_TODOS_ALL);

  if (cached) {
    const todos: TodoClient[] = JSON.parse(cached);
    return todos;
  }

  await connectToDatabase();

  const todos: TodoType[] = await Todo.find().lean().sort({ createdAt: -1 });

  await redis.set(CACHE_TODOS_ALL, JSON.stringify(todos), {
    EX: CACHE_TTL_TODOS_SECONDS,
  });

  return todos.map((todo) => normalizeTodo(todo));
};

const addTodo = async (value: string) => {
  await connectToDatabase();

  const newTodo = await Todo.create({ title: value, isDone: false });

  if (!newTodo) {
    throw new Error('Не удалось создать задание');
  }

  const redis = await getRedisClient();
  await redis.del(CACHE_TODOS_ALL);
};

const toggleTodo = async (id: string, isDone: boolean) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error('Невалидный id задачи');
  }

  await connectToDatabase();

  const updatedTodo: TodoType | null = await Todo.findByIdAndUpdate(
    id,
    { isDone },
    { returnDocument: 'after' },
  );

  if (!updatedTodo) {
    throw new Error('Задание не найдено');
  }

  const redis = await getRedisClient();
  await redis.del(CACHE_TODOS_ALL);
};

const deleteTodo = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error('Невалидный id задачи');
  }

  await connectToDatabase();

  const deletedTodo: TodoType | null = await Todo.findByIdAndDelete(id);

  if (!deletedTodo) {
    throw new Error('Задание не найдено');
  }

  const redis = await getRedisClient();
  await redis.del(CACHE_TODOS_ALL);
};

export { getAllTodos, toggleTodo, deleteTodo, addTodo };
