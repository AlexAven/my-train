import connectToDatabase from '@/lib/db/mongodb';
import getRedisClient from '@/lib/db/redis';
import Todo from '@/models/todo';

const CACHE_TODOS_ALL = 'cache:todos:all';
const CACHE_TTL_TODOS_SECONDS = 60;

const getAllTodos = async () => {
  const redis = await getRedisClient();
  const cached = await redis.get(CACHE_TODOS_ALL);

  if (cached) {
    const todos = JSON.parse(cached);

    return todos;
  }

  await connectToDatabase();

  const todos = await Todo.find().lean().sort({ createdAt: -1 });

  redis.set(CACHE_TODOS_ALL, JSON.stringify(todos), {
    EX: CACHE_TTL_TODOS_SECONDS,
  });

  return todos;
};

export { getAllTodos }
