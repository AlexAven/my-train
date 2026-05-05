import { TodoClient } from '@/types';

const normalizeTodo = (todo: TodoClient) => ({ ...todo, _id: String(todo._id) });

export default normalizeTodo;
