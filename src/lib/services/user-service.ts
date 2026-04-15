import connectToDatabase from '@/lib/db/mongodb';
import getRedisClient from '@/lib/db/redis';
import User from '@/models/user';

const USERS_CACHE_KEY = 'cache:users:all';
const CACHE_TTL_SECONDS = 60;

const getAllUsers = async () => {
  const redis = await getRedisClient();
  const cached = await redis.get(USERS_CACHE_KEY);

  if (cached) {
    const users = JSON.parse(cached);

    return users;
  }

  await connectToDatabase();

  const users = await User.find().lean().sort({ createdAt: -1 });

  await redis.set(USERS_CACHE_KEY, JSON.stringify(users), {
    EX: CACHE_TTL_SECONDS,
  });

  return users;
};

const searchUsersByName = async (query: string) => {
  const normalizedQuery = query.toLowerCase().trim();

  const cacheKey = `cache:users:search:${normalizedQuery}`;

  const redis = await getRedisClient();
  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  await connectToDatabase();

  const users = await User.find({
    name: { $regex: normalizedQuery, $options: 'i' },
  })
    .lean()
    .sort({ createdAt: -1 });

  await redis.set(cacheKey, JSON.stringify(users), {
    EX: 30,
  });

  return users;
};

export { getAllUsers, searchUsersByName };
