import { Types } from 'mongoose';

import connectToDatabase from '@/lib/db/mongodb';
import getRedisClient from '@/lib/db/redis';
import Todo from '@/models/todo';
import normalizeTodo from '../utils/normalize-todo';

import { TodoClient, TodoType } from '@/types';

const CACHE_TODOS_ALL = 'cache:todos:all';
// const CACHE_TODO = (id: string) => `cache:todo:${id}`;
const CACHE_TTL_TODOS_SECONDS = 60;
// const CACHE_TTL_TODO_SECONDS = 30;

const getAllTodos = async () => {
  const redis = await getRedisClient();
  const cached = await redis.get(CACHE_TODOS_ALL);

  if (cached) {
    const todos: TodoClient[] = JSON.parse(cached);
    return todos;
  }

  await connectToDatabase();

  const todos: TodoType[] = (await Todo.find().lean().sort({ createdAt: -1 }));

  await redis.set(CACHE_TODOS_ALL, JSON.stringify(todos), {
    EX: CACHE_TTL_TODOS_SECONDS,
  });

  return todos.map((todo) => (normalizeTodo(todo)));
};

// const getTodoById = async (id: string) => {
//   const redis = await getRedisClient();
//   const cachedTodo = await redis.get(CACHE_TODO(id));

//   if (cachedTodo) {
//     return JSON.parse(cachedTodo);
//   }

//   const cachedAll = await redis.get(CACHE_TODOS_ALL);

//   if (cachedAll) {
//     const todos = JSON.parse(cachedAll);
//     const selectedTodo = todos.find((todo: TodoClient) => todo._id === id);

//     if (selectedTodo) {
//       await redis.set(CACHE_TODO(id), JSON.stringify(selectedTodo), {
//         EX: CACHE_TTL_TODO_SECONDS,
//       });

//       return selectedTodo;
//     }
//   }

//   await connectToDatabase();

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return notFound();
//   }

//   const selectedTodo = await Todo.findById(id).lean();

//   if (!selectedTodo) return null;

//   await redis.set(CACHE_TODO(id), JSON.stringify(selectedTodo), {
//     EX: CACHE_TTL_TODO_SECONDS,
//   });

//   return selectedTodo;
// };

const toggleTodo = async (id: string, isDone: boolean) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error('Невалидный id задачи');
  }

  await connectToDatabase();

  const updatedTodo: TodoType | null = await Todo.findByIdAndUpdate(id, { isDone }, { returnDocument: 'after' });

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

export { getAllTodos, toggleTodo, deleteTodo };
