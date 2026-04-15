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

export { getAllUsers };
