import { TodoClient, TodoType } from '@/types';

const normalizeTodo = (todo: TodoType): TodoClient => ({
  ...todo,
  _id: String(todo._id),
  createdAt: todo.createdAt.toISOString(),
  updatedAt: todo.updatedAt.toISOString(),
});

export default normalizeTodo;
